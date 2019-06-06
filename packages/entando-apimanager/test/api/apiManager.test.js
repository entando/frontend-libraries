import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { addToast } from '@entando/messages';

import { config, makeRequest, goToLoginPage, goToLandingPage, METHODS } from 'api/apiManager';
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
    domain: '//google.com',
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
    expect(goToLoginPage).toEqual(expect.any(Function));
    const newLogin = jest.fn();
    config(mockStore(MOCKED), newLogin);
    expect(goToLoginPage()).toBe(newLogin);
  });

  it('can get landing page', () => {
    expect(goToLandingPage).toEqual(expect.any(Function));
    const newLanding = jest.fn();
    config(mockStore(MOCKED), null, newLanding);
    expect(goToLandingPage()).toBe(newLanding);
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

    it('fetches from the real api when useMocks is false', (done) => {
      const result = makeRequest(validRequest);
      expect(fetch).toHaveBeenCalledWith(
        '//google.com/api/test',
        {
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

    it('appends the page to the uri when there is no query string', () => {
      makeRequest(validRequest, { page: 1, pageSize: 10 });
      expect(fetch).toHaveBeenCalledWith(
        '//google.com/api/test?page=1&pageSize=10',
        {
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
        uri: '/api/test?my=var',
      }, { page: 1, pageSize: 10 });
      expect(fetch).toHaveBeenCalledWith(
        '//google.com/api/test?my=var&page=1&pageSize=10',
        {
          method: validRequest.method,
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
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
        '//google.com/api/test',
        {
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
        '//google.com/api/test',
        {
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
        '//google.com/api/test',
        {
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
        '//google.com/api/test',
        {
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
        '//google.com/api/test',
        {
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
        result.catch((err) => {
          expect(err).toBeInstanceOf(Error);
          expect(err).toHaveProperty('message', 'app.permissionDenied');
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
          '//google.com/api/test',
          {
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
        const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
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
        const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
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
        const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
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
        const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
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
