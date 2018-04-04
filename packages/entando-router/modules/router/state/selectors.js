import { createSelector } from 'reselect';

let getRouterCustom = null;

const getRouterDefault = state => state.router;

export const setRouterSelector = (newSelector) => { getRouterCustom = newSelector; };

export const getRouter = state => (
  getRouterCustom ?
    getRouterCustom(state) :
    getRouterDefault(state)
);

export const getLocation = createSelector(
  [getRouter],
  router => (router && router.location),
);

export const getRoute = createSelector(
  [getRouter],
  router => (router && router.route),
);

export const getParams = createSelector(
  [getRouter],
  router => (router && router.params) || {},
);

export const getSearchParams = createSelector(
  [getRouter],
  router => (router && router.searchParams) || {},
);
