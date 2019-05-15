import reducer from 'state/current-user/reducer';
import { setUser, unsetUser } from 'state/current-user/actions';

let defaultState;

describe('current-user reducer', () => {
  beforeEach(() => {
    defaultState = reducer();
  });

  it('should return an object', () => {
    expect(typeof defaultState).toBe('object');
    expect(defaultState).toHaveProperty('username', null);
    expect(defaultState).toHaveProperty('token', null);
    expect(defaultState).toHaveProperty('tokenRefresh', null);
  });

  it('should return predefined values if the localStorage exist', () => {
    localStorage.setItem('username', 'admin');
    localStorage.setItem('token', 'myToken');
    localStorage.setItem('tokenRefresh', 'myRefreshToken');
    const state = reducer();
    expect(state).toHaveProperty('username', 'admin');
    expect(state).toHaveProperty('token', 'myToken');
    expect(state).toHaveProperty('tokenRefresh', 'myRefreshToken');
    localStorage.clear();
  });

  describe('after action setUser', () => {
    describe('username', () => {
      it('should assign the username status if a string', () => {
        const state = reducer(defaultState, setUser({ username: 'nic', token: 'asdf123' }));
        expect(state).toHaveProperty('username', 'nic');
      });

      it('should not assign the username status if not a string', () => {
        const state = reducer(defaultState, setUser({ username: true, token: 'asdf123' }));
        expect(state).toHaveProperty('username', null);
      });

      it('should not assign the username status if it is not defined', () => {
        const state = reducer(defaultState, setUser({ token: 'asdf123' }));
        expect(state).toHaveProperty('username', null);
      });

      it('should not assign the username status if the token is not valid', () => {
        const state = reducer(defaultState, setUser({ username: 'nic' }));
        expect(state).toHaveProperty('username', null);
      });
    });

    describe('token', () => {
      it('should assign the token status if a string', () => {
        const state = reducer(defaultState, setUser({ username: 'nic', token: 'asdf123' }));
        expect(state).toHaveProperty('token', 'asdf123');
      });

      it('should not assign the token status if not a string', () => {
        const state = reducer(defaultState, setUser({ username: 'nic', token: false, tokenRefresh: !0 }));
        expect(state).toHaveProperty('token', null);
        expect(state).toHaveProperty('tokenRefresh', null);
      });

      it('should not assign the token status if it is not defined', () => {
        const state = reducer(defaultState, setUser({ username: 'nic' }));
        expect(state).toHaveProperty('token', null);
        expect(state).toHaveProperty('tokenRefresh', null);
      });

      it('should not assign the token status if the username is not valid', () => {
        const state = reducer(defaultState, setUser({ token: 'asdf123' }));
        expect(state).toHaveProperty('token', null);
      });
    });
  });

  describe('after action unsetUser', () => {
    it('should return null username, token, and tokenRefresh', () => {
      const state = reducer(defaultState, unsetUser());
      expect(state).toHaveProperty('username', null);
      expect(state).toHaveProperty('token', null);
      expect(state).toHaveProperty('tokenRefresh', null);
    });

    it('should return null on username, token, and tokenRefresh even after setting a user', () => {
      let state = reducer(defaultState, setUser({ username: 'nic', token: 'asdf123' }));
      expect(state).toHaveProperty('username', 'nic');
      expect(state).toHaveProperty('token', 'asdf123');
      expect(state).not.toHaveProperty('tokenRefresh', '');
      state = reducer(defaultState, unsetUser());
      expect(state).toHaveProperty('username', null);
      expect(state).toHaveProperty('token', null);
      expect(state).toHaveProperty('tokenRefresh', null);
    });
  });
});
