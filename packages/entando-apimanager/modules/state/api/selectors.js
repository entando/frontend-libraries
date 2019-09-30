import { createSelector } from 'reselect';

export const getApi = state => state.api;

export const useMocks = createSelector(
  getApi,
  api => api.useMocks,
);

export const getDomain = createSelector(
  getApi,
  api => api.domain,
);

export const getPathPrefix = createSelector(
  getApi,
  api => api.pathPrefix,
);

export const wasUpdated = createSelector(
  getApi,
  api => api.updated,
);
