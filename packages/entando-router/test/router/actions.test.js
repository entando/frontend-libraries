import { isFSA } from 'flux-standard-action';

import {
  notifyRouteChange,
} from 'router/state/actions';

import {
  NOTIFY_CHANGE,
} from 'router/state/types';

describe('router/actions', () => {
  describe('notifyRouteChange', () => {
    const LOCATION = {};
    const ROUTE = 'fakeRouteName';
    const PARAMS = {};
    const SEARCH_PARAMS = {};

    let action;

    beforeEach(() => {
      action = notifyRouteChange(LOCATION, ROUTE, PARAMS, SEARCH_PARAMS);
    });

    it('should be FSA compliant', () => {
      expect(isFSA(action)).toBe(true);
    });

    it(`should be of type "${NOTIFY_CHANGE}"`, () => {
      expect(action.type).toBe(NOTIFY_CHANGE);
    });

    it('should set the payload with the parameters', () => {
      expect(action.payload).toBeDefined();
      expect(action.payload.location).toBe(LOCATION);
      expect(action.payload.route).toBe(ROUTE);
      expect(action.payload.params).toBe(PARAMS);
      expect(action.payload.searchParams).toBe(SEARCH_PARAMS);
    });
  });
});
