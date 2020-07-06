import 'whatwg-fetch';
import { throttle, isEmpty } from '@entando/utils';

import { buildResponse, buildErrorResponse, ErrorResponse, ErrorI18n } from './responseFactory';
import { useMocks, getDomain } from '../state/api/selectors';
import { logoutUser } from '../state/current-user/actions';
import { getToken } from '../state/current-user/selectors';
import enLocale from '../locales/en';
import itLocale from '../locales/it';

export const METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
  PATCH: 'PATCH',
};

export const locales = [enLocale, itLocale];

const defaultMessages = enLocale.messages;

let store = null;
let onLoginCallback = () => { };
let onLogoutCallback = () => { };

export const onLogin = () => onLoginCallback;
export const onLogout = () => onLogoutCallback;

const defaultPage = { page: 1, pageSize: 10 };

const isValidMethod = method => method in METHODS;

const isValidBody = (method, body) => (
  method === METHODS.GET ||
  method === METHODS.DELETE ||
  typeof body === 'object'
);

const validateRequest = (request) => {
  if (typeof request !== 'object' ||
    isEmpty(request.uri) ||
    isEmpty(request.method) ||
    !isValidMethod(request.method) ||
    typeof request.mockResponse !== 'object' ||
    !isValidBody(request.method, request.body)
  ) {
    throw new Error('invalid request object');
  }
};

const getAuthenticationToken = () => (
  getToken(store.getState())
);

const getErrors = (errorsCallback, request) => {
  let errors = [];
  if (request.useAuthentication && !getAuthenticationToken()) {
    errors = [{ code: 120, message: 'authorization required' }];
  } else if (typeof errorsCallback === 'function') {
    errors = errorsCallback();
  }

  return Array.isArray(errors) ? errors : [];
};

const getMockResponseStatusCode = (errors) => {
  if (errors.length) {
    return typeof errors[0] === 'object' && errors[0].code === 120 ? 401 : 400;
  }

  return 200;
};

export const config = (reduxStore, newOnLogin = () => { }, newOnLogout = () => { }) => {
  store = reduxStore;
  onLogoutCallback = newOnLogout;
  onLoginCallback = newOnLogin;
};

export const makeMockRequest = (request, page = defaultPage) => {
  validateRequest(request);
  const errors = getErrors(request.errors, request);
  const statusCode = getMockResponseStatusCode(errors);
  if (statusCode === 401 || statusCode === 503) {
    store.dispatch(logoutUser({ statusCode, request }));
  }
  return new Promise(resolve => throttle(() => (
    resolve(new Response(
      new Blob(
        [
          JSON.stringify(
            errors.length ? buildErrorResponse(errors) : buildResponse(request.mockResponse, page),
            null,
            2,
          ),
        ],
        { type: 'application/json' },
      ),
      { status: statusCode },
    ))
  )));
};

const getParsedBody = (contentType, body) => {
  if (contentType === 'application/x-www-form-urlencoded') {
    return Object.keys(body).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(body[key])}`).join('&');
  }
  return JSON.stringify(body);
};

const getRequestParams = (request) => {
  const isFormData = request.contentType === 'multipart/form-data';
  const contentTypeHeader = !isFormData ? { 'Content-Type': request.contentType || 'application/json' } : {};

  const requestParams = {
    method: request.method,
    headers: {
      ...contentTypeHeader,
      ...request.headers,
    },
    credentials: (request.useCredentials === true) ? 'include' : 'omit',
  };
  if ([METHODS.POST, METHODS.PUT, METHODS.PATCH].includes(request.method)) {
    requestParams.body = isFormData
      ? request.body
      : getParsedBody(request.contentType, request.body);
  }
  if (request.useAuthentication) {
    requestParams.headers.Authorization = `Bearer ${getAuthenticationToken()}`;
  }

  return requestParams;
};

const isAbsoluteUrl = (url) => {
  try {
    new URL(url); // eslint-disable-line no-new
    return true;
  } catch (e) {
    return false;
  }
};

const getCompleteRequestUrl = (request, params = {}) => {
  // note on new URL():
  // if url (first parameter) is an absolute path, base domain is not used
  // if base domain is provided, it has to be absolute (even when url is absolute!)
  // e.g.,
  //  new URL('http://www.entando.com') -> { href: 'http://www.entando.com/', ... }
  //  new URL('/digital-exchange', 'http://www.entando.com') -> { href: 'http://www.entando.com/digital-exchange', ... }
  //  new URL('/digital-exchange') -> error [ERR_INVALID_URL]: Invalid URL: /digital-exchange
  //  new URL('http://www.entando.com', 'not-url') -> error [ERR_INVALID_URL]: Invalid URL: not-url
  //  new URL('http://www.entando.com', '/digital-exchange') -> error [ERR_INVALID_URL]: Invalid URL: /digital-exchange

  const storedDomain = getDomain(store.getState());

  const parsedStoredDomain = isAbsoluteUrl(storedDomain)
    ? storedDomain
    : new URL(new URL(window.location.href).origin + storedDomain).href;

  // using request.domain if it's absolute or appending it if relative, also trimming last '/'
  const requestDomain =
    new URL(request.domain || '', parsedStoredDomain).href.replace(/\/$/, '');

  const endpointUrl = new URL(requestDomain + request.uri);

  Object.keys(params).map(key => endpointUrl.searchParams.append(key, params[key]));

  return endpointUrl.href;
};

const normalizeErrorMessage = (message) => {
  if (['noJsonReturned', 'permissionDenied', 'badRequest', 'serviceUnavailable'].includes(message)) {
    return message;
  }

  return 'serverError';
};

export const makeRealRequest = (request, page) => {
  validateRequest(request);
  if (request.useAuthentication && !getAuthenticationToken()) {
    store.dispatch(logoutUser({ statusCode: 401, request }));
    return new Promise(resolve => resolve({ ok: false, status: 401 }));
  }
  return fetch(
    getCompleteRequestUrl(request, page),
    getRequestParams(request),
  ).then((response) => {
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('noJsonReturned');
    }
    if (response.status === 401) {
      store.dispatch(logoutUser({ statusCode: 401, request, response }));
      throw new ErrorResponse('permissionDenied', response);
    } else if (response.status.toString().startsWith(5)) {
      if (response.status === 503) {
        store.dispatch(logoutUser({ statusCode: 401, request, response }));
        throw new ErrorResponse('serviceUnavailable', response);
      } else {
        throw new ErrorResponse('serverError', response);
      }
    }
    return response;
  }).catch((e) => {
    const promise = e.response && e.response.json
      ? e.response.json()
      : Promise.resolve({ errors: [] });
    return promise.then(({ errors }) => {
      const message = `app.${normalizeErrorMessage(e.message)}`;
      return Promise.reject(new ErrorI18n(
        message,
        defaultMessages[message],
        { domain: getDomain(store.getState()) },
        errors,
      ));
    });
  });
};

export const makeRequest = (request, page) => {
  if (useMocks(store.getState())) {
    return makeMockRequest(request, page);
  }
  return makeRealRequest(request, page);
};
