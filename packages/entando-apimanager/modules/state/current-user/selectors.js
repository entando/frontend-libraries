import { createSelector } from 'reselect';

export const getCurrentUser = state => state.currentUser;

export const getUsername = createSelector(
  getCurrentUser,
  user => user.username,
);

export const getToken = createSelector(
  getCurrentUser,
  user => user.token,
);

export const getTokenRefresh = createSelector(
  getCurrentUser,
  user => user.tokenRefresh,
);
