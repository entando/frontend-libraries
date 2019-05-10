import { SET_USER, SET_TOKEN, UNSET_USER } from './types';
import { goToLoginPage, goToLandingPage, authIntercept } from '../../api/apiManager';

export const setUser = user => ({
  type: SET_USER,
  payload: {
    user,
  },
});

export const setToken = payload => ({
  type: SET_TOKEN,
  payload,
});

export const unsetUser = () => ({
  type: UNSET_USER,
  payload: {
    user: {
      username: null,
      token: null,
      tokenRefresh: null,
    },
  },
});

const tokensToLocalStore = (token, tokenRefresh = '') => {
  localStorage.setItem('token', token);
  if (tokenRefresh) {
    localStorage.setItem('tokenRefresh', tokenRefresh);
    authIntercept();
  }
};

// thunks

export const setTokenCredentials = (token, tokenRefresh = '') => (dispatch) => {
  dispatch(setToken({
    token,
    tokenRefresh,
  }));

  tokensToLocalStore(token, tokenRefresh);
};

export const loginUser = (username, token, tokenRefresh = '') => (dispatch) => {
  dispatch(setUser({
    username,
    token,
    tokenRefresh,
  }));

  localStorage.setItem('username', username);
  tokensToLocalStore(token, tokenRefresh);
  goToLandingPage()();
};

export const logoutUser = () => (dispatch) => {
  dispatch(unsetUser());

  localStorage.removeItem('username');
  localStorage.removeItem('token');
  localStorage.removeItem('tokenRefresh');
  goToLoginPage()();
};
