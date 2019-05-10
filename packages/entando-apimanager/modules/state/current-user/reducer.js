import { isEmpty } from '@entando/utils';

import { SET_USER, SET_TOKEN, UNSET_USER } from './types';

const getInitialState = () => ({
  username: localStorage.getItem('username'),
  token: localStorage.getItem('token'),
  tokenRefresh: localStorage.getItem('tokenRefresh'),
});

const doesPayloadHadToken = payload => (
  !isEmpty(payload.token) &&
  typeof payload.token === 'string'
);

const isPayloadValid = payload => (
  !isEmpty(payload.username) &&
  typeof payload.username === 'string' &&
  doesPayloadHadToken(payload)
);

const reducer = (state = getInitialState(), action = {}) => {
  switch (action.type) {
    case SET_USER: {
      return isPayloadValid(action.payload.user) ? action.payload.user : state;
    }
    case SET_TOKEN: {
      return doesPayloadHadToken(action.payload) ? { ...state, ...action.payload } : state;
    }
    case UNSET_USER: {
      return action.payload.user;
    }
    default: return state;
  }
};

export default reducer;
