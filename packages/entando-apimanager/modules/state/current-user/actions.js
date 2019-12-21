import { SET_USER, UNSET_USER } from './types';
import { goToLoginPage, goToLandingPage } from '../../api/apiManager';

export const setUser = user => ({
  type: SET_USER,
  payload: {
    user,
  },
});

export const unsetUser = () => ({
  type: UNSET_USER,
  payload: {
    user: {
      username: null,
      token: null,
    },
  },
});

// thunks

export const loginUser = (username, token) => (dispatch) => {
  const { search } = window.location;
  let redirectUri = '';
  if (search) {
    redirectUri = new URLSearchParams(search).get('redirect_uri');
  }
  dispatch(setUser({
    username,
    token,
  }));

  localStorage.setItem('username', username);
  localStorage.setItem('token', token);
  goToLandingPage()({ redirectUri });
};

export const logoutUser = status => (dispatch) => {
  const { pathname } = window.location;
  dispatch(unsetUser());

  localStorage.removeItem('username');
  localStorage.removeItem('token');
  goToLoginPage()(status ? { ...status, pathname } : status);
};
