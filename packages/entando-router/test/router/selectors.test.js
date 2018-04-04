
import {
  getRouter,
  getLocation,
  getRoute,
  getParams,
  getSearchParams,
  setRouterSelector,
} from 'router/state/selectors';

const ROUTER_STATE = {
  location: {},
  route: 'user',
  params: { id: '12' },
  searchParams: { view: 'profile' },
};

const STATE_DEFAULT = {
  router: ROUTER_STATE,
};

const STATE_CUSTOM = {
  my: STATE_DEFAULT,
};

describe('router/state/selectors', () => {
  describe('with default state property "router"', () => {
    it('getRouter(state) should return the router state', () => {
      expect(getRouter(STATE_DEFAULT)).toEqual(STATE_DEFAULT.router);
    });

    it('getLocation(state) should return the location state', () => {
      expect(getLocation(STATE_DEFAULT)).toEqual(STATE_DEFAULT.router.location);
    });

    it('getRoute(state) should return the route state', () => {
      expect(getRoute(STATE_DEFAULT)).toEqual(STATE_DEFAULT.router.route);
    });

    it('getParams(state) should return the params state', () => {
      expect(getParams(STATE_DEFAULT)).toEqual(STATE_DEFAULT.router.params);
    });

    it('getSearchParams(state) should return the search params state', () => {
      expect(getSearchParams(STATE_DEFAULT)).toEqual(STATE_DEFAULT.router.searchParams);
    });
  });

  describe('with custom property "my.router"', () => {
    beforeEach(() => {
      setRouterSelector(state => state.my.router);
    });
    it('getRouter(state) should return the router state', () => {
      expect(getRouter(STATE_CUSTOM)).toEqual(STATE_CUSTOM.my.router);
    });

    it('getLocation(state) should return the location state', () => {
      expect(getLocation(STATE_CUSTOM)).toEqual(STATE_CUSTOM.my.router.location);
    });

    it('getRoute(state) should return the route state', () => {
      expect(getRoute(STATE_CUSTOM)).toEqual(STATE_CUSTOM.my.router.route);
    });

    it('getParams(state) should return the params state', () => {
      expect(getParams(STATE_CUSTOM)).toEqual(STATE_CUSTOM.my.router.params);
    });

    it('getSearchParams(state) should return the search params state', () => {
      expect(getSearchParams(STATE_CUSTOM)).toEqual(STATE_CUSTOM.my.router.searchParams);
    });
  });
});
