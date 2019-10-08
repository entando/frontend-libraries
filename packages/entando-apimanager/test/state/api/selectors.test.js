import {
  getApi,
  useMocks,
  getDomain,
  wasUpdated,
} from 'state/api/selectors';

const api = {
  useMocks: false,
  domain: '//mydomain.com',
  updated: false,
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
});
