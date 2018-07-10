import {
  setRoutes,
  matchRoute,
  setMode,
  isValidAction,
  routeToPath,
  gotoPath,
  locationToRoute,
  config,
  getHistory,
  // eslint-disable-next-line
} from 'router/router.js';

import createBrowserHistory from 'history/createBrowserHistory';
import createHashHistory from 'history/createHashHistory';

jest.mock('history/createBrowserHistory');
jest.mock('history/createHashHistory');

const ROUTES = [
  { name: 'about', path: '/about' }, // basic route
  { name: 'user', path: '/user/:id' }, // route with required parameters
  { name: 'docs', path: '/docs/:id?' }, // route with optional parameters
];

describe('router', () => {
  describe('setRoutes()', () => {
    let routes;
    beforeEach(() => {
      routes = setRoutes(ROUTES);
    });
    it('should transform the routes', () => {
      expect(Array.isArray(routes)).toBe(true);
      expect(routes.length).toBe(3);
      routes.forEach((route, i) => {
        expect(route.name).toBe(ROUTES[i].name);
        expect(route.path).toBe(ROUTES[i].path);

        expect(route.re instanceof RegExp).toBe(true);
        expect(typeof route.getPath === 'function').toBe(true);
        expect(Array.isArray(route.keys)).toBe(true);
      });
    });
  });

  describe('matchRoute()', () => {
    let routes;
    beforeEach(() => {
      routes = setRoutes(ROUTES);
    });

    describe('matching a basic route', () => {
      let match;
      beforeEach(() => {
        match = matchRoute(routes, '/about');
      });
      it('should return a match object', () => {
        expect(match).toBeDefined();
      });
      it('should return the matched route object', () => {
        expect(match.route).toBe(routes[0]);
      });
      it('should return an empty params object', () => {
        expect(match.params).toEqual({});
      });
    });

    describe('matching a route with required parameters', () => {
      let match;
      beforeEach(() => {
        match = matchRoute(routes, '/user/john');
      });
      it('should return a match object', () => {
        expect(match).toBeDefined();
      });
      it('should return the matched route object', () => {
        expect(match.route).toBe(routes[1]);
      });
      it('should return the params object', () => {
        expect(match.params).toEqual({ id: 'john' });
      });
      it('should not match an URL without the required parameter', () => {
        match = matchRoute(routes, '/user/');
        expect(match).toBe(null);
      });
    });

    describe('matching a route with optional parameters', () => {
      let match;
      beforeEach(() => {
        match = matchRoute(routes, '/docs/john');
      });
      it('should return a match object', () => {
        expect(match).toBeDefined();
      });
      it('should return the matched route object', () => {
        expect(match.route).toBe(routes[2]);
      });
      it('should return the params object', () => {
        expect(match.params).toEqual({ id: 'john' });
      });
      it('should match an URL without the optional parameter', () => {
        match = matchRoute(routes, '/docs/');
        expect(match.route).toBe(routes[2]);
      });
    });
  });

  describe('setMode()', () => {
    it('should create an hash history', () => {
      setMode('hash');
      expect(createHashHistory).toHaveBeenCalled();
    });
    it('should create a browser history', () => {
      setMode('browser');
      expect(createBrowserHistory).toHaveBeenCalled();
    });
  });

  describe('isValidAction()', () => {
    it('should validate push', () => {
      expect(isValidAction('push')).toBe(true);
    });
    it('should validate pop', () => {
      expect(isValidAction('pop')).toBe(true);
    });
    it('should validate replace', () => {
      expect(isValidAction('replace')).toBe(true);
    });
  });

  describe('routeToPath()', () => {
    beforeEach(() => {
      setRoutes(ROUTES);
    });

    it('should throw an error if route does not exists', () => {
      const testFunc = () => routeToPath('blah');
      expect(testFunc).toThrowError(/Route "blah" is not defined/);
    });

    it('should return path with no arguments', () => {
      const path = routeToPath('about');
      expect(path).toBe('/about');
    });
    it('should return a path with arguments', () => {
      const path = routeToPath('user', { id: '3' });
      expect(path).toBe('/user/3');
    });
    it('should return a path with optional arguments', () => {
      const path = routeToPath('docs', { id: '3' });
      expect(path).toBe('/docs/3');
    });
    it('should return a path with missing optional arguments', () => {
      const path = routeToPath('docs');
      expect(path).toBe('/docs');
    });

    it('should return a path with search parameters', () => {
      const path = routeToPath('docs', { id: '3' }, { lang: 'ita' });
      expect(path).toBe('/docs/3?lang=ita');
    });
  });

  describe('gotoPath()', () => {
    let history;
    const PATH = '/docs';
    beforeEach(() => {
      history = setMode('browser');
      history.push.mockReset();
      history.pop.mockReset();
      history.replace.mockReset();
    });

    it('should call history.push()', () => {
      gotoPath('push', PATH);
      expect(history.push).toHaveBeenCalledWith(PATH);
    });
    it('should call history.pop()', () => {
      gotoPath('pop', PATH);
      expect(history.pop).toHaveBeenCalledWith(PATH);
    });
    it('should call history.replace()', () => {
      gotoPath('replace', PATH);
      expect(history.replace).toHaveBeenCalledWith(PATH);
    });

    it('should not call invalid history methods', () => {
      gotoPath('invalidMethod', PATH);
      expect(history.push).not.toHaveBeenCalled();
      expect(history.pop).not.toHaveBeenCalled();
      expect(history.replace).not.toHaveBeenCalled();
    });
  });

  describe('locationToRoute()', () => {
    let compiledRoutes;

    beforeEach(() => {
      compiledRoutes = setRoutes(ROUTES);
    });

    it('should return an object with the matched information', () => {
      const route = locationToRoute({
        pathname: '/user/4',
      });
      expect(route.route).toBe(compiledRoutes[1]);
      expect(route.params).toEqual({ id: '4' });
      expect(route.searchParams).toEqual({});
    });

    it('should return an object with search params', () => {
      const route = locationToRoute({
        pathname: '/user/4',
        search: 'lang=ita',
      });
      expect(route.route).toBe(compiledRoutes[1]);
      expect(route.params).toEqual({ id: '4' });
      expect(route.searchParams).toEqual({ lang: 'ita' });
    });
  });

  describe('config()', () => {
    const CONFIG = {
      mode: 'browser',
      routes: ROUTES,
      notFoundRoute: { name: 'notFound', path: '/404' },
    };

    it('should subscribe to the store', () => {
      let subscription;

      const mockStore = {
        dispatch: jest.fn(),
        subscribe: jest.fn()
          .mockImplementation((func) => {
            subscription = func;
          }),
        getState: () => ({ router: { location: { } } }),
      };

      config(mockStore, CONFIG);

      expect(mockStore.subscribe).toHaveBeenCalled();

      subscription();
    });

    it('should subscribe to the store (no time travel)', () => {
      let subscription;

      const mockStore = {
        dispatch: jest.fn(),
        subscribe: jest.fn()
          .mockImplementation((func) => {
            subscription = func;
          }),
        getState: () => ({ router: { location: getHistory().location } }),
      };

      config(mockStore, CONFIG);

      expect(mockStore.subscribe).toHaveBeenCalled();

      subscription();
    });
  });

  describe('config() with pathPrefix', () => {
    const CONFIG = {
      mode: 'browser',
      routes: ROUTES,
      notFoundRoute: { name: 'notFound', path: '/404' },
      pathPrefix: '/appbuilder',
    };
    let routes;
    beforeEach(() => {
      routes = setRoutes(ROUTES);
    });
    it('should transform the routes', () => {
      const mockStore = {
        dispatch: jest.fn(),
        subscribe: jest.fn(),
        getState: () => ({ router: { location: { } } }),
      };

      config(mockStore, CONFIG);

      expect(Array.isArray(routes)).toBe(true);
      expect(routes.length).toBe(3);
      routes.forEach((route, i) => {
        expect(route.name).toBe(ROUTES[i].name);
        expect(route.path).toBe(ROUTES[i].path);
        expect(route.path).toMatch(/^\/appbuilder.*/);

        expect(route.re instanceof RegExp).toBe(true);
        expect(typeof route.getPath === 'function').toBe(true);
        expect(Array.isArray(route.keys)).toBe(true);
      });
    });
  });
});
