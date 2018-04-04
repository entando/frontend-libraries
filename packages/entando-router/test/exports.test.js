import * as router from 'index';

describe('exports all router functionalities', () => {
  it('is an object', () => {
    expect(typeof router).toBe('object');
  });

  it('exports router reducer', () => {
    expect(router).toHaveProperty('routerReducer', expect.any(Function));
  });

  it('exports Link', () => {
    expect(router).toHaveProperty('Link', expect.any(Function));
  });

  it('exports routerConfig', () => {
    expect(router).toHaveProperty('routerConfig', expect.any(Function));
  });

  it('exports gotoRoute', () => {
    expect(router).toHaveProperty('gotoRoute', expect.any(Function));
  });

  describe('selectors', () => {
    it('exports setRouterSelector', () => {
      expect(router).toHaveProperty('setRouterSelector', expect.any(Function));
    });

    it('exports getRouter', () => {
      expect(router).toHaveProperty('getRouter', expect.any(Function));
    });

    it('exports getLocation', () => {
      expect(router).toHaveProperty('getLocation', expect.any(Function));
    });

    it('exports getRoute', () => {
      expect(router).toHaveProperty('getRoute', expect.any(Function));
    });

    it('exports getParams', () => {
      expect(router).toHaveProperty('getParams', expect.any(Function));
    });

    it('exports getSearchParams', () => {
      expect(router).toHaveProperty('getSearchParams', expect.any(Function));
    });
  });
});
