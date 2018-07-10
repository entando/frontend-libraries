import createBrowserHistory from 'history/createBrowserHistory';
import createHashHistory from 'history/createHashHistory';
import pathToRegexp, { compile } from 'path-to-regexp';
import { notifyRouteChange } from './state/actions';
import { deparam } from './utils';
import { getRouter } from './state/selectors';

// history
let history = null;
let store = null;
let isTimeTraveling = false;

let routes = null;
let routeNotFound = null;
let pathPrefix = null;

export const getHistory = () => history;

export function setRoutes(rts) {
  let i;
  const cnt = rts.length;
  let route;
  let keys;
  for (i = 0; i < cnt; i += 1) {
    keys = [];
    route = rts[i];
    if (pathPrefix) {
      route.path = pathPrefix + route.path;
    }
    route.re = pathToRegexp(route.path, keys);
    route.keys = keys;
    route.getPath = compile(route.path);
  }
  routes = rts;
  return routes;
}

export function matchRoute(theRoutes, url) {
  for (let i = 0; i < theRoutes.length; i += 1) {
    const route = theRoutes[i];
    const match = route.re.exec(url);
    if (match) {
      const params = {};
      for (let j = 0; j < route.keys.length; j += 1) {
        params[route.keys[j].name] = match[j + 1];
      }
      return { route, params };
    }
  }
  return null;
}


// private funcs

export function setMode(mode) {
  if (mode === 'hash') {
    history = createHashHistory();
  } else {
    history = createBrowserHistory();
  }
  return history;
}

export function isValidAction(historyAction) {
  return ['push', 'pop', 'replace'].indexOf(historyAction) >= 0;
}


export const routeToPath = (routeName, params, searchParams) => {
  const route = routes.find(routeObj => routeObj.name === routeName);
  if (!route) {
    throw new Error(`Route "${routeName}" is not defined!`);
  }

  let url = route.getPath(params);

  if (searchParams) {
    const searchArr = [];
    Object.keys(searchParams).forEach((k) => {
      searchArr.push(`${encodeURIComponent(k)}=${encodeURIComponent(searchParams[k])}`);
    });
    url += `?${searchArr.join('&')}`;
  }
  return url;
};

export const gotoPath = (historyAction, path) => {
  if (isValidAction(historyAction)) {
    history[historyAction](path);
  }
};


export const gotoRoute = (routeName, params, searchParams) => {
  gotoPath('push', routeToPath(routeName, params, searchParams));
};

export function locationToRoute(historyLocation) {
  let newRoute = null;
  let newParams = null;
  let searchParams = null;
  const match = matchRoute(routes, historyLocation.pathname);

  if (match) {
    newRoute = match.route;
    newParams = match.params;
    searchParams = deparam((historyLocation.search || '').replace(/^\?/, ''));
  } else {
    newRoute = routeNotFound.name;
  }

  return {
    route: newRoute,
    params: newParams,
    searchParams,
  };
}


export const configStore = (reduxStore) => {
  store = reduxStore;

  // FIXME pass action
  const urlChangeHandler = (location /* , action */) => {
    if (!isTimeTraveling) {
      // store.dispatch(setLocation(location, action));
      const parsedRoute = locationToRoute(location);
      store.dispatch(notifyRouteChange(
        location,
        parsedRoute.route,
        parsedRoute.params,
        parsedRoute.searchParams,
      ));
    }
  };


  history.listen(urlChangeHandler);
  urlChangeHandler(history.location, 'replace');

  // align url with store changes
  store.subscribe(() => {
    const rtr = getRouter(store.getState());
    if (rtr && history.location !== rtr.location) {
      isTimeTraveling = true;
      history.replace(rtr.location);
      isTimeTraveling = false;
    }
  });
};


export const config = (reduxStore, locConfig) => {
  pathPrefix = locConfig.pathPrefix || null; // Used in setRoutes, so set this first
  setRoutes(locConfig.routes);
  routeNotFound = locConfig.notFoundRoute;
  if (pathPrefix) {
    routeNotFound.path = pathPrefix + routeNotFound.path;
  }
  setMode(locConfig.mode);
  configStore(reduxStore);
};
