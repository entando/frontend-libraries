import 'whatwg-fetch';
import { throttle, isEmpty } from '@entando/utils';

import { buildResponse, buildErrorResponse, ErrorI18n } from './responseFactory';
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

const getCompleteRequestUrl = (request, page) => {
  const domain = request.domain || getDomain(store.getState());
  const url = `${domain}${request.uri}`;
  if (!page || !page.page) {
    return url;
  }

  return url.concat(
    url.indexOf('?') !== -1 ? '&' : '?',
    `page=${page.page}&pageSize=${page.pageSize}`,
  );
};

const normalizeErrorMessage = (message) => {
  if (['noJsonReturned', 'permissionDenied', 'serviceUnavailable'].includes(message)) {
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
      throw new Error('permissionDenied');
    } else if (response.status.toString().startsWith(5)) {
      if (response.status === 503) {
        store.dispatch(logoutUser({ statusCode: 401, request, response }));
        throw new Error('serviceUnavailable');
      } else {
        throw new Error('serverError');
      }
    }
    return response;
  }).catch((e) => {
    const message = `app.${normalizeErrorMessage(e.message)}`;
    return Promise.reject(new ErrorI18n(
      message,
      defaultMessages[message],
      { domain: getDomain(store.getState()) },
    ));
  });
};

export const makeRequest = (request, page) => {
  if (useMocks(store.getState())) {
    return makeMockRequest(request, page);
  }
  return makeRealRequest(request, page);
};
