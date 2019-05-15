import {
  getCurrentUser,
  getUsername,
  getToken,
  getTokenRefresh,
} from 'state/current-user/selectors';

const currentUser = {
  username: 'nic',
  token: 'asdf123',
  tokenRefresh: 'whatthe2345',
};

const STATE = { currentUser };

describe('current-user selectors', () => {
  it('verify getCurrentUser selector', () => {
    expect(getCurrentUser(STATE)).toEqual(currentUser);
  });

  it('verify getUsername selector', () => {
    expect(getUsername(STATE)).toEqual(currentUser.username);
  });

  it('verify getToken selector', () => {
    expect(getToken(STATE)).toEqual(currentUser.token);
  });

  it('verify getTokenRefresh selector', () => {
    expect(getTokenRefresh(STATE)).toEqual(currentUser.tokenRefresh);
  });
});
