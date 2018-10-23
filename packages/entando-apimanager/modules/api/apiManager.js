import 'whatwg-fetch';
import { throttle, isEmpty, formattedText } from '@entando/utils';
import { addToast, TOAST_ERROR } from '@entando/messages';

import { buildResponse, buildErrorResponse } from './responseFactory';
import { useMocks, getDomain } from '../state/api/selectors';
import { logoutUser } from '../state/current-user/actions';
import { getToken } from '../state/current-user/selectors';

export const METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
};

let store = null;
let loginPage = null;
let landingPage = null;

export const getLoginPage = () => loginPage;
export const getLandingPage = () => landingPage;

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

export const config = (reduxStore, newLoginPage = null, newLandingPage = null) => {
  store = reduxStore;
  landingPage = newLandingPage;
  loginPage = newLoginPage;
};

export const makeMockRequest = (request, page = defaultPage) => {
  validateRequest(request);
  const errors = getErrors(request.errors, request);
  const statusCode = getMockResponseStatusCode(errors);
  if (statusCode === 401) {
    store.dispatch(logoutUser());
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
  const requestParams = {
    method: request.method,
    headers: {
      'Content-Type': request.contentType || 'application/json',
      ...request.headers,
    },
  };
  if (request.method === METHODS.POST || request.method === METHODS.PUT) {
    requestParams.body = getParsedBody(request.contentType, request.body);
  }
  if (request.useAuthentication) {
    requestParams.headers.Authorization = `Bearer ${getAuthenticationToken()}`;
  }

  return requestParams;
};

const getCompleteRequestUrl = (request, page) => {
  const url = `${getDomain(store.getState())}${request.uri}`;
  if (!page || !page.page) {
    return url;
  }

  return url.concat(
    url.indexOf('?') !== -1 ? '&' : '?',
    `page=${page.page}&pageSize=${page.pageSize}`,
  );
};

const normalizeErrorMessage = (message) => {
  if (['noJsonReturned', 'permissionDenied'].includes(message)) {
    return message;
  }

  return 'serverError';
};

export const makeRealRequest = (request, page) => {
  validateRequest(request);
  if (request.useAuthentication && !getAuthenticationToken()) {
    store.dispatch(logoutUser());
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
      store.dispatch(logoutUser());
      throw new Error('permissionDenied');
    } else if (response.status.toString().startsWith(5)) {
      throw new Error('serverError');
    }
    return response;
  }).catch((e) => {
    store.dispatch(addToast(
      formattedText(
        `app.${normalizeErrorMessage(e.message)}`,
        null,
        { domain: getDomain(store.getState()) },
      ),
      TOAST_ERROR,
    ));
    // eslint-disable-next-line no-console
    console.error(e);
    throw e;
  });
};

export const makeRequest = (request, page) => {
  if (useMocks(store.getState())) {
    return makeMockRequest(request, page);
  }
  return makeRealRequest(request, page);
};
