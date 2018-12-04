import * as apiManager from 'index';

describe('exports all apiManager functionalities', () => {
  it('is an object', () => {
    expect(typeof apiManager).toBe('object');
  });

  describe('apiManager', () => {
    it('exports makeRequest', () => {
      expect(apiManager).toHaveProperty('makeRequest', expect.any(Function));
    });

    it('exports makeMockRequest', () => {
      expect(apiManager).toHaveProperty('makeMockRequest', expect.any(Function));
    });

    it('exports the METHODS constant', () => {
      expect(apiManager).toHaveProperty('METHODS', {
        GET: 'GET',
        POST: 'POST',
        PUT: 'PUT',
        DELETE: 'DELETE',
        PATCH: 'PATCH',
      });
    });
  });

  describe('state: currentUser', () => {
    it('exports currentUser reducer', () => {
      expect(apiManager).toHaveProperty('currentUser', expect.any(Function));
    });

    it('exports loginUser action', () => {
      expect(apiManager).toHaveProperty('loginUser', expect.any(Function));
    });

    it('exports logoutUser action', () => {
      expect(apiManager).toHaveProperty('logoutUser', expect.any(Function));
    });

    it('exports getUsername selector', () => {
      expect(apiManager).toHaveProperty('getUsername', expect.any(Function));
    });

    it('exports getToken selector', () => {
      expect(apiManager).toHaveProperty('getToken', expect.any(Function));
    });
  });

  describe('state: api', () => {
    it('exports api reducer', () => {
      expect(apiManager).toHaveProperty('api', expect.any(Function));
    });

    it('exports setApi action', () => {
      expect(apiManager).toHaveProperty('setApi', expect.any(Function));
    });

    it('exports getApi selector', () => {
      expect(apiManager).toHaveProperty('getApi', expect.any(Function));
    });

    it('exports useMocks selector', () => {
      expect(apiManager).toHaveProperty('useMocks', expect.any(Function));
    });

    it('exports getDomain selector', () => {
      expect(apiManager).toHaveProperty('getDomain', expect.any(Function));
    });

    it('exports wasUpdated selector', () => {
      expect(apiManager).toHaveProperty('wasUpdated', expect.any(Function));
    });
  });
});
