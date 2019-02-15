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
  dispatch(setUser({
    username,
    token,
  }));

  localStorage.setItem('username', username);
  localStorage.setItem('token', token);
  goToLandingPage()();
};

export const logoutUser = () => (dispatch) => {
  dispatch(unsetUser());

  localStorage.removeItem('username');
  localStorage.removeItem('token');
  goToLoginPage()();
};
