export { default as routerReducer } from 'router/state/reducer';
export { default as Link } from 'router/components/Link';
export { config as routerConfig, gotoRoute } from 'router/router';
export {
  setRouterSelector,
  getRouter,
  getLocation,
  getRoute,
  getParams,
  getSearchParams,
} from 'router/state/selectors';
