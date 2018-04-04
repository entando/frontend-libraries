import reducer from 'router/state/reducer';
import { NOTIFY_CHANGE } from 'router/state/types';

const NOTIFY_CHANGE_MOCK = {
  type: NOTIFY_CHANGE,
  payload: {
    location: {},
    route: { name: 'mockRoute' },
  },
};
describe('router reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({});
  });

  it('should return the initial if no action', () => {
    expect(reducer(undefined)).toEqual({});
  });

  it(`should handle "${NOTIFY_CHANGE}"`, () => {
    expect(reducer({}, NOTIFY_CHANGE_MOCK)).toEqual({
      location: {},
      route: 'mockRoute',
      params: undefined,
      searchParams: undefined,
    });
  });
});
