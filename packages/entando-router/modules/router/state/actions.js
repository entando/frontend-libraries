/* eslint import/prefer-default-export : 0 */
import { NOTIFY_CHANGE } from './types';


export function notifyRouteChange(location, route, params, searchParams) {
  return {
    type: NOTIFY_CHANGE,
    payload: {
      location,
      route,
      params: params || {},
      searchParams: searchParams || {},
    },
  };
}
