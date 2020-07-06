import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { addToast } from '@entando/messages';

import { config, makeRequest, onLogin, onLogout, METHODS } from 'api/apiManager';
import { logoutUser } from 'state/current-user/actions';

jest.unmock('api/apiManager');

jest.mock('state/current-user/actions', () => ({
  logoutUser: jest.fn(() => ({ type: '' })),
}));

const mockStore = configureMockStore([thunk]);

const MOCKED_GOOD_RESPONSE = { code: 12 };
const REAL_GOOD_RESPONSE = { payload: { code: 30 } };

const MOCKED = {
  api: {
    useMocks: true,
  },
  currentUser: {
    token: null,
  },
};

const REAL = {
  api: {
    useMocks: false,
    domain: 'https://www.entando.com/entando-de-app',
  },
  currentUser: {
    token: null,
  },
};

const REAL_RELATIVE = {
  api: {
    useMocks: false,
    domain: '/entando-de-app',
  },
  currentUser: {
    token: null,
  },
};

const validRequest = {
  uri: '/api/test',
  method: METHODS.GET,
  mockResponse: MOCKED_GOOD_RESPONSE,
};

const mockResponse = (payload, ok = true, status = 200, contentType = 'application/json') => ({
  headers: {
    get: () => [contentType],
  },
  ok,
  status,
  payload,
});

const fetch = jest.spyOn(window, 'fetch').mockImplementation(() => (
  new Promise((resolve) => {
    resolve(mockResponse(REAL_GOOD_RESPONSE.payload));
  })
));

describe('apiManager', () => {
  beforeEach(() => {
    config(mockStore(MOCKED));
    jest.clearAllMocks();
  });

  it('can get login page', () => {
    expect(onLogin).toEqual(expect.any(Function));
    const newLogin = jest.fn();
    config(mockStore(MOCKED), newLogin);
    expect(onLogin()).toBe(newLogin);
  });

  it('can get landing page', () => {
    expect(onLogout).toEqual(expect.any(Function));
    const newLanding = jest.fn();
    config(mockStore(MOCKED), null, newLanding);
    expect(onLogout()).toBe(newLanding);
  });

  it('cannot make a request if request is not an object', () => {
    expect(makeRequest).toThrowError('invalid request object');
  });

  it('cannot make a request if request is missing the uri', () => {
    const badRequest = () => { makeRequest({ method: METHODS.GET, mockResponse: {} }); };
    expect(badRequest).toThrowError('invalid request object');
  });

  describe('method validation', () => {
    it('cannot make a request if request is missing the method', () => {
      const badRequest = () => { makeRequest({ uri: '/api/test', mockResponse: {} }); };
      expect(badRequest).toThrowError('invalid request object');
    });

    it('cannot make a request if the request method is invalid', () => {
      const badRequest = () => { makeRequest({ method: 'LET', uri: '/api/test', mockResponse: {} }); };
      expect(badRequest).toThrowError('invalid request object');
    });
  });

  describe('mockResponse validation', () => {
    it('cannot make a request if request is missing the mockResponse', () => {
      const badRequest = () => { makeRequest({ method: METHODS.GET, uri: '/api/test' }); };
      expect(badRequest).toThrowError('invalid request object');
    });

    it('cannot make a request if the request mockResponse is not an object', () => {
      const badRequest = () => { makeRequest({ method: METHODS.GET, uri: '/api/test', mockResponse: 's' }); };
      expect(badRequest).toThrowError('invalid request object');
    });
  });

  describe('body validation', () => {
    it('can be not defined if the request is get', () => {
      const request = () => { makeRequest({ uri: '/api/test', mockResponse: {}, method: METHODS.GET }); };
      expect(request).not.toThrowError('invalid request object');
    });

    it('has to be defined if the request is POST', () => {
      const badRequest = () => { makeRequest({ uri: '/api/test', mockResponse: {}, method: METHODS.POST }); };
      expect(badRequest).toThrowError('invalid request object');
    });

    it('has to be defined if the request is PUT', () => {
      const badRequest = () => { makeRequest({ uri: '/api/test', mockResponse: {}, method: METHODS.PUT }); };
      expect(badRequest).toThrowError('invalid request object');
    });

    it('has to be defined if the request is PATCH', () => {
      const badRequest = () => { makeRequest({ uri: '/api/test', mockResponse: {}, method: METHODS.PATCH }); };
      expect(badRequest).toThrowError('invalid request object');
    });
  });

  describe('mock request', () => {
    it('fetches from the mock when useMocks is true', (done) => {
      const result = makeRequest(validRequest);
      expect(fetch).not.toHaveBeenCalled();
      expect(result).toBeInstanceOf(Promise);
      result.then((data) => {
        expect(data).toBeInstanceOf(Response);
        expect(data).toHaveProperty('ok', true);
        return data.json();
      }).then((json) => {
        expect(json).toMatchObject({ payload: MOCKED_GOOD_RESPONSE });
        done();
      }).catch(done.fail);
    });

    describe('errors handling', () => {
      it('returns an error if the errors callback is returning an array', (done) => {
        const result = makeRequest({
          ...validRequest,
          errors: () => ['test'],
        });
        expect(fetch).not.toHaveBeenCalled();
        expect(result).toBeInstanceOf(Promise);
        result.then((data) => {
          expect(data).toBeInstanceOf(Response);
          expect(data).toHaveProperty('ok', false);
          expect(data).toHaveProperty('status', 400);
          return data.json();
        }).then((json) => {
          expect(json).toHaveProperty('payload', {});
          expect(json).toHaveProperty('errors', ['test']);
          done();
        }).catch(done.fail);
      });

      it('does not return an error if the errors callback is not a function', (done) => {
        const result = makeRequest({
          ...validRequest,
          errors: 12,
        });
        expect(fetch).not.toHaveBeenCalled();
        expect(result).toBeInstanceOf(Promise);
        result.then((data) => {
          expect(data).toBeInstanceOf(Response);
          expect(data).toHaveProperty('ok', true);
          done();
        }).catch(done.fail);
      });

      it('does not return an error if the errors callback is not returning an array', (done) => {
        const result = makeRequest({
          ...validRequest,
          errors: () => 12,
        });
        expect(fetch).not.toHaveBeenCalled();
        expect(result).toBeInstanceOf(Promise);
        result.then((data) => {
          expect(data).toBeInstanceOf(Response);
          expect(data).toHaveProperty('ok', true);
          done();
        }).catch(done.fail);
      });

      it('does not return an error if the errors callback is returning an empty array', (done) => {
        const result = makeRequest({
          ...validRequest,
          errors: () => [],
        });
        expect(fetch).not.toHaveBeenCalled();
        expect(result).toBeInstanceOf(Promise);
        result.then((data) => {
          expect(data).toBeInstanceOf(Response);
          expect(data).toHaveProperty('ok', true);
          done();
        }).catch(done.fail);
      });
    });

    describe('authentication', () => {
      it('returns 403 if the request requires authentication and no token was found', (done) => {
        const result = makeRequest({
          ...validRequest,
          useAuthentication: true,
        });
        expect(fetch).not.toHaveBeenCalled();
        expect(result).toBeInstanceOf(Promise);
        result.then((data) => {
          expect(data).toBeInstanceOf(Response);
          expect(data).toHaveProperty('ok', false);
          expect(data).toHaveProperty('status', 401);
          data.json().then((json) => {
            expect(json).toHaveProperty('payload', {});
            expect(json.errors).toHaveLength(1);
            expect(json.errors).toContainEqual({ code: 120, message: 'authorization required' });
            expect(logoutUser).toHaveBeenCalled();
            done();
          });
        }).catch(done.fail);
      });
    });
  });

  describe('api request', () => {
    beforeEach(() => {
      config(mockStore(REAL));
    });

    const expectedUrl = new URL(REAL.api.domain + validRequest.uri).href;

    it('fetches from the real api when useMocks is false', (done) => {
      const result = makeRequest(validRequest);

      expect(fetch).toHaveBeenCalledWith(
        expectedUrl,
        {
          credentials: 'omit',
          method: validRequest.method,
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      expect(result).toBeInstanceOf(Promise);
      result.then((data) => {
        expect(data).toMatchObject(REAL_GOOD_RESPONSE);
        done();
      }).catch(done.fail);
    });

    describe('with domain environment variable', () => {
      it('fetches when domain is an absolute path', (done) => {
        // if DOMAIN === http://apps.rd.entando.org/entando-de-app
        //    request.uri === /api/permissions
        //    request.domain === undefined
        // then full URL has to be http://apps.rd.entando.org/entando-de-app/api/permissions

        config(mockStore({ api: { domain: REAL.api.domain } }));

        const result = makeRequest(validRequest);

        expect(fetch).toHaveBeenCalledWith(
          new URL(REAL.api.domain + validRequest.uri).href,
          {
            credentials: 'omit',
            method: validRequest.method,
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
        expect(result).toBeInstanceOf(Promise);
        result.then((data) => {
          expect(data).toMatchObject(REAL_GOOD_RESPONSE);
          done();
        }).catch(done.fail);
      });

      it('fetches when domain is a relative path', (done) => {
        // if DOMAIN === /entando-de-app
        //    request.uri === /api/permissions
        //    request.domain === undefined
        // then full URL has to be <ENV_LOCATION_ORIGIN>/entando-de-app/api/permissions

        config(mockStore({ api: { domain: REAL_RELATIVE.api.domain } }));

        const result = makeRequest(validRequest);

        expect(fetch).toHaveBeenCalledWith(
          new URL(`http://localhost${REAL_RELATIVE.api.domain}${validRequest.uri}`).href,
          {
            credentials: 'omit',
            method: validRequest.method,
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
        expect(result).toBeInstanceOf(Promise);
        result.then((data) => {
          expect(data).toMatchObject(REAL_GOOD_RESPONSE);
          done();
        }).catch(done.fail);
      });
    });

    describe('with domain parameter passed', () => {
      it('fetches when domain parameter is an absolute path', (done) => {
        // if DOMAIN === http://apps.rd.entando.org/entando-de-app
        //    request.uri === /components
        //    request.domain === http://apps.rd.entando.org/digital-exchange
        // then full URL has to be http://apps.rd.entando.org/digital-exchange/components
        const customDomain = 'http://custom.entando.com';
        const result = makeRequest({ ...validRequest, domain: customDomain });

        expect(fetch).toHaveBeenCalledWith(
          new URL(customDomain + validRequest.uri).href,
          {
            credentials: 'omit',
            method: validRequest.method,
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
        expect(result).toBeInstanceOf(Promise);
        result.then((data) => {
          expect(data).toMatchObject(REAL_GOOD_RESPONSE);
          done();
        }).catch(done.fail);
      });

      it('fetches when domain parameter is a relative path', (done) => {
        // if DOMAIN === http://apps.rd.entando.org/entando-de-app
        //    request.uri === /components
        //    request.domain === /digital-exchange
        // then full URL has to be http://apps.rd.entando.org/digital-exchange/components
        const customRelativeDomain = '/entando-digital-exchange';

        const result = makeRequest({ ...validRequest, domain: customRelativeDomain });

        expect(fetch).toHaveBeenCalledWith(
          new URL(new URL(REAL.api.domain).origin + customRelativeDomain + validRequest.uri).href,
          {
            credentials: 'omit',
            method: validRequest.method,
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
        expect(result).toBeInstanceOf(Promise);
        result.then((data) => {
          expect(data).toMatchObject(REAL_GOOD_RESPONSE);
          done();
        }).catch(done.fail);
      });

      it('fetches when domain environment variable and domain parameter are a relative paths', (done) => {
        // if DOMAIN === /entando-de-app
        //    request.uri === /components
        //    request.domain === /digital-exchange
        // then full URL has to be <ENV_LOCATION_ORIGIN>/digital-exchange/components
        config(mockStore({ api: { domain: REAL_RELATIVE.api.domain } }));

        const customRelativeDomain = '/entando-digital-exchange';
        const result = makeRequest({ ...validRequest, domain: customRelativeDomain });

        expect(fetch).toHaveBeenCalledWith(
          new URL(`http://localhost${customRelativeDomain}${validRequest.uri}`).href,
          {
            credentials: 'omit',
            method: validRequest.method,
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
        expect(result).toBeInstanceOf(Promise);
        result.then((data) => {
          expect(data).toMatchObject(REAL_GOOD_RESPONSE);
          done();
        }).catch(done.fail);
      });
    });

    describe('with request parameters passed', () => {
      it('appends the request parameter to the uri when there is no query string in url', () => {
        makeRequest(validRequest, { page: 1, pageSize: 10 });
        expect(fetch).toHaveBeenCalledWith(
          `${expectedUrl}?page=1&pageSize=10`,
          {
            credentials: 'omit',
            method: validRequest.method,
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
      });

      it('appends the page to the uri when there is a query string', () => {
        makeRequest({
          ...validRequest,
          uri: `${validRequest.uri}?my=var`,
        }, { page: 1, pageSize: 10 });
        expect(fetch).toHaveBeenCalledWith(
          `${expectedUrl}?my=var&page=1&pageSize=10`,
          {
            credentials: 'omit',
            method: validRequest.method,
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
      });
    });

    it('sends the body when the request is POST', (done) => {
      const result = makeRequest({
        uri: '/api/test',
        method: METHODS.POST,
        mockResponse: MOCKED_GOOD_RESPONSE,
        body: {
          username: 'test',
          password: 'test',
        },
      });
      expect(fetch).toHaveBeenCalledWith(
        expectedUrl,
        {
          credentials: 'omit',
          method: METHODS.POST,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: 'test',
            password: 'test',
          }),
        },
      );
      expect(result).toBeInstanceOf(Promise);
      result.then((data) => {
        expect(data).toMatchObject(REAL_GOOD_RESPONSE);
        done();
      }).catch(done.fail);
    });

    it('sends the body when the request is PUT', (done) => {
      const result = makeRequest({
        uri: '/api/test',
        method: METHODS.PUT,
        mockResponse: MOCKED_GOOD_RESPONSE,
        body: {
          username: 'test',
          password: 'test',
        },
      });
      expect(fetch).toHaveBeenCalledWith(
        expectedUrl,
        {
          credentials: 'omit',
          method: METHODS.PUT,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: 'test',
            password: 'test',
          }),
        },
      );
      expect(result).toBeInstanceOf(Promise);
      result.then((data) => {
        expect(data).toMatchObject(REAL_GOOD_RESPONSE);
        done();
      }).catch(done.fail);
    });

    it('sends the body when the request is PATCH', (done) => {
      const result = makeRequest({
        uri: '/api/test',
        method: METHODS.PATCH,
        mockResponse: MOCKED_GOOD_RESPONSE,
        body: {
          username: 'test',
          password: 'test',
        },
      });
      expect(fetch).toHaveBeenCalledWith(
        expectedUrl,
        {
          credentials: 'omit',
          method: METHODS.PATCH,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: 'test',
            password: 'test',
          }),
        },
      );
      expect(result).toBeInstanceOf(Promise);
      result.then((data) => {
        expect(data).toMatchObject(REAL_GOOD_RESPONSE);
        done();
      }).catch(done.fail);
    });

    it('sends the body as x-www-form-urlencoded', (done) => {
      const result = makeRequest({
        uri: '/api/test',
        method: METHODS.POST,
        mockResponse: MOCKED_GOOD_RESPONSE,
        contentType: 'application/x-www-form-urlencoded',
        body: {
          username: 'test',
          password: 'test',
        },
      });
      expect(fetch).toHaveBeenCalledWith(
        expectedUrl,
        {
          credentials: 'omit',
          method: METHODS.POST,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: 'username=test&password=test',
        },
      );
      expect(result).toBeInstanceOf(Promise);
      result.then((data) => {
        expect(data).toMatchObject(REAL_GOOD_RESPONSE);
        done();
      }).catch(done.fail);
    });

    it('attaches additional headers when specified', (done) => {
      const result = makeRequest({
        uri: '/api/test',
        method: METHODS.GET,
        mockResponse: MOCKED_GOOD_RESPONSE,
        headers: { ciao: 'whatever', 'Other-Stuff': 'my-stuff' },
      });
      expect(fetch).toHaveBeenCalledWith(
        expectedUrl,
        {
          credentials: 'omit',
          method: METHODS.GET,
          headers: {
            'Content-Type': 'application/json',
            ciao: 'whatever',
            'Other-Stuff': 'my-stuff',
          },
        },
      );
      expect(result).toBeInstanceOf(Promise);
      result.then((data) => {
        expect(data).toMatchObject(REAL_GOOD_RESPONSE);
        done();
      }).catch(done.fail);
    });

    describe('authentication', () => {
      it('returns 401 if the request requires authentication and no token was found', (done) => {
        const result = makeRequest({
          ...validRequest,
          useAuthentication: true,
        });
        expect(fetch).not.toHaveBeenCalled();
        expect(result).toBeInstanceOf(Promise);
        result.then((data) => {
          expect(data).toHaveProperty('ok', false);
          expect(data).toHaveProperty('status', 401);
          expect(logoutUser).toHaveBeenCalled();
          done();
        }).catch(done.fail);
      });

      it('sends the bearer token if the authentication is necessary and the token is found', (done) => {
        config(mockStore({
          ...REAL,
          currentUser: { token: '395d491d59fba6c5d3a371c9549d7015' },
        }));
        const result = makeRequest({
          ...validRequest,
          useAuthentication: true,
        });
        expect(fetch).toHaveBeenCalledWith(
          expectedUrl,
          {
            credentials: 'omit',
            method: validRequest.method,
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer 395d491d59fba6c5d3a371c9549d7015',
            },
          },
        );
        expect(result).toBeInstanceOf(Promise);
        result.then((data) => {
          expect(data).toMatchObject(REAL_GOOD_RESPONSE);
          done();
        }).catch(done.fail);
      });

      it('throws an exception, adds a toast, redirects and unsets the user if fetch returns a 401', (done) => {
        const consoleError = jest.spyOn(console, 'error').mockImplementation(() => { });
        const customFetch = jest.spyOn(window, 'fetch').mockImplementation(() => (
          new Promise((resolve) => {
            resolve(mockResponse(null, false, 401));
          })
        ));

        config(mockStore({
          ...REAL,
          currentUser: { token: '395d491d59fba6c5d3a371c9549d7015' },
        }));

        const result = makeRequest({
          ...validRequest,
          useAuthentication: true,
        });
        expect(customFetch).toHaveBeenCalled();
        expect(result).toBeInstanceOf(Promise);
        expect(result).rejects.toThrowError('permissionDenied');
        result.then(done.fail).catch((err) => {
          expect(err).toHaveProperty('message', 'app.permissionDenied');
          expect(logoutUser).toHaveBeenCalled();
          expect(consoleError).not.toHaveBeenCalled();
          expect(addToast).not.toHaveBeenCalled();
          done();
        });

        customFetch.mockReset();
        customFetch.mockRestore();
      });
    });

    describe('bad content-type', () => {
      jest.clearAllMocks();
      it('throws an exception and adds a toast if the returned content type is not json', (done) => {
        const consoleError = jest.spyOn(console, 'error').mockImplementation(() => { });
        const customFetch = jest.spyOn(window, 'fetch').mockImplementation(() => (
          new Promise((resolve) => {
            resolve(mockResponse(null, true, 200, 'text/html'));
          })
        ));

        const result = makeRequest(validRequest);
        expect(customFetch).toHaveBeenCalled();
        expect(result).toBeInstanceOf(Promise);
        expect(result).rejects.toThrowError('noJsonReturned');
        result.then(done.fail).catch((err) => {
          expect(err).toHaveProperty('message', 'app.noJsonReturned');
          expect(consoleError).not.toHaveBeenCalled();
          expect(addToast).not.toHaveBeenCalled();
          done();
        });

        customFetch.mockReset();
        customFetch.mockRestore();
      });
    });

    describe('500', () => {
      jest.clearAllMocks();
      it('throws an exception and adds a toast if any 5xx status is returned', (done) => {
        const consoleError = jest.spyOn(console, 'error').mockImplementation(() => { });
        const customFetch = jest.spyOn(window, 'fetch').mockImplementation(() => (
          new Promise((resolve) => {
            resolve(mockResponse(null, false, 500));
          })
        ));

        const result = makeRequest(validRequest);
        expect(customFetch).toHaveBeenCalled();
        expect(result).toBeInstanceOf(Promise);
        expect(result).rejects.toThrowError('serverError');
        result.then(done.fail).catch((err) => {
          expect(err).toHaveProperty('message', 'app.serverError');
          expect(consoleError).not.toHaveBeenCalled();
          expect(addToast).not.toHaveBeenCalled();
          done();
        });

        customFetch.mockReset();
        customFetch.mockRestore();
      });
    });

    describe('503', () => {
      jest.clearAllMocks();
      it('throws an exception and adds a toast if any 503 status is returned', (done) => {
        const consoleError = jest.spyOn(console, 'error').mockImplementation(() => { });
        const customFetch = jest.spyOn(window, 'fetch').mockImplementation(() => (
          new Promise((resolve) => {
            resolve(mockResponse(null, false, 503));
          })
        ));

        const result = makeRequest(validRequest);
        expect(customFetch).toHaveBeenCalled();
        expect(result).toBeInstanceOf(Promise);
        expect(result).rejects.toThrowError('serviceUnavailable');
        result.then(done.fail).catch((err) => {
          expect(err).toHaveProperty('message', 'app.serviceUnavailable');
          expect(logoutUser).toHaveBeenCalled();
          expect(consoleError).not.toHaveBeenCalled();
          expect(addToast).not.toHaveBeenCalled();
          done();
        });

        customFetch.mockReset();
        customFetch.mockRestore();
      });
    });
  });
});
