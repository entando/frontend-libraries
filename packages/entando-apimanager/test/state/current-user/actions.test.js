import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { gotoRoute } from '@entando/router';

import { config } from 'api/apiManager';
import { setUser, unsetUser, loginUser, logoutUser } from 'state/current-user/actions';
import { SET_USER, UNSET_USER } from 'state/current-user/types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

let store;

const LANDING_PAGE = 'landingPage';
const LOGIN_PAGE = 'loginPage';

describe('current-user actions', () => {
  beforeEach(() => {
    store = mockStore();
    config(store, LOGIN_PAGE, LANDING_PAGE);
  });

  describe('setUser', () => {
    it('test setUser action sets the correct type', () => {
      const action = setUser({});
      expect(action).toHaveProperty('type', SET_USER);
    });

    it('test setUser action sets the correct payload', () => {
      const action = setUser({ test: true });
      expect(action).toHaveProperty('payload', { user: { test: true } });
    });
  });

  describe('unsetUser', () => {
    it('test unsetUser action sets the correct type', () => {
      const action = unsetUser({});
      expect(action).toHaveProperty('type', UNSET_USER);
    });

    it('test unsetUser action sets the correct payload', () => {
      const action = unsetUser({ test: true });
      expect(action).toHaveProperty('payload', expect.any(Object));
      expect(action).toHaveProperty('payload.user', expect.any(Object));
      expect(action).toHaveProperty('payload.user.username', null);
      expect(action).toHaveProperty('payload.user.token', null);
    });
  });

  describe('loginUser', () => {
    it('stores the user in the localStorage and redirects him to the dashboard', () => {
      store.dispatch(loginUser('admin', 'asdf123'));
      expect(store.getActions()).toHaveLength(1);
      const action = store.getActions()[0];
      expect(action).toHaveProperty('type', SET_USER);
      expect(action).toHaveProperty('payload.user.username', 'admin');
      expect(action).toHaveProperty('payload.user.token', 'asdf123');
      expect(localStorage.setItem).toHaveBeenCalledWith('username', 'admin');
      expect(localStorage.setItem).toHaveBeenCalledWith('token', 'asdf123');
      expect(gotoRoute).toHaveBeenCalledWith(LANDING_PAGE);
    });
  });

  describe('logoutUser', () => {
    it('clears the user in the localStorage and redirects him to the homepage', () => {
      store.dispatch(logoutUser());
      expect(store.getActions()).toHaveLength(1);
      const action = store.getActions()[0];
      expect(action).toHaveProperty('type', UNSET_USER);
      expect(action).toHaveProperty('payload.user.username', null);
      expect(action).toHaveProperty('payload.user.token', null);
      expect(localStorage.removeItem).toHaveBeenCalledWith('username');
      expect(localStorage.removeItem).toHaveBeenCalledWith('token');
      expect(gotoRoute).toHaveBeenCalledWith(LOGIN_PAGE);
    });
  });
});
