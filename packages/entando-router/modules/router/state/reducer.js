import { NOTIFY_CHANGE } from 'router/state/types';

export default (state = {}, action = null) => {
  if (!action) {
    return state;
  }
  const { payload } = action;
  switch (action.type) {
    case NOTIFY_CHANGE:
      return Object.assign({}, state, {
        location: payload.location,
        route: payload.route.name,
        params: payload.params,
        searchParams: payload.searchParams,
      });

    default:
      return state;
  }
};
