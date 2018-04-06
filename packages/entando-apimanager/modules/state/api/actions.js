import { SET_API } from './types';

// eslint-disable-next-line
export const setApi = api => ({
  type: SET_API,
  payload: {
    api,
  },
});
