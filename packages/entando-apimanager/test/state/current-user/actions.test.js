import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

import { config } from 'api/apiManager';
import { setUser, unsetUser, loginUser, logoutUser } from 'state/current-user/actions';
import { SET_USER, UNSET_USER } from 'state/current-user/types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

let store;

const LANDING_PAGE = jest.fn();
const LOGIN_PAGE = jest.fn();

jest.spyOn(Storage.prototype, 'setItem');
jest.spyOn(Storage.prototype, 'removeItem');

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
      expect(action).toHaveProperty('payload.user.tokenRefresh', null);
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
      expect(action).toHaveProperty('payload.user.tokenRefresh', '');
      expect(localStorage.setItem).toHaveBeenCalledWith('username', 'admin');
      expect(localStorage.setItem).toHaveBeenCalledWith('token', 'asdf123');
      expect(localStorage.setItem).not.toHaveBeenCalledWith('tokenRefresh', '');
      expect(LANDING_PAGE).toHaveBeenCalled();
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
      expect(action).toHaveProperty('payload.user.tokenRefresh', null);
      expect(localStorage.removeItem).toHaveBeenCalledWith('username');
      expect(localStorage.removeItem).toHaveBeenCalledWith('token');
      expect(localStorage.removeItem).toHaveBeenCalledWith('tokenRefresh');
      expect(LOGIN_PAGE).toHaveBeenCalled();
    });
  });
});

describe('config with refresh tokens', () => {
  beforeEach(() => {
    store = mockStore();
    config(store, LOGIN_PAGE, LANDING_PAGE, {
      generateParams: {},
      parseResults: jest.fn(),
    });
  });

  describe('setUser', () => {
    it('see if tokenRefresh exists in payload', () => {
      const action = setUser({ username: 'a', token: 'b', tokenRefresh: 'c' });
      expect(action).toHaveProperty('type', SET_USER);
      expect(action).toHaveProperty('payload.user.tokenRefresh', 'c');
    });
  });

  describe('loginUser', () => {
    it('stores all in localStorage and calls landingPage function', () => {
      store.dispatch(loginUser('admin', 'asdf123', 'whatthe456'));
      expect(store.getActions()).toHaveLength(1);
      const action = store.getActions()[0];
      expect(action).toHaveProperty('type', SET_USER);
      expect(action).toHaveProperty('payload.user.username', 'admin');
      expect(action).toHaveProperty('payload.user.token', 'asdf123');
      expect(action).toHaveProperty('payload.user.tokenRefresh', 'whatthe456');
      expect(localStorage.setItem).toHaveBeenCalledWith('username', 'admin');
      expect(localStorage.setItem).toHaveBeenCalledWith('token', 'asdf123');
      expect(localStorage.setItem).toHaveBeenCalledWith('tokenRefresh', 'whatthe456');
      expect(LANDING_PAGE).toHaveBeenCalled();
    });
  });
});
