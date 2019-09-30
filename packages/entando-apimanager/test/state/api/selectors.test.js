import {
  getApi,
  useMocks,
  getDomain,
  wasUpdated,
  getPathPrefix,
} from 'state/api/selectors';

const api = {
  useMocks: false,
  domain: '//mydomain.com',
  updated: false,
  pathPrefix: '/entando',
};

const STATE = { api };

describe('api selectors', () => {
  it('verify getApi selector', () => {
    expect(getApi(STATE)).toEqual(api);
  });

  it('verify useMocks selector', () => {
    expect(useMocks(STATE)).toEqual(api.useMocks);
  });

  it('verify getDomain selector', () => {
    expect(getDomain(STATE)).toEqual(api.domain);
  });

  it('verify wasUpdated selector', () => {
    expect(wasUpdated(STATE)).toEqual(api.updated);
  });

  it('verify getPathPrefix selector', () => {
    expect(getPathPrefix(STATE)).toEqual(api.pathPrefix);
  });
});
