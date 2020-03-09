import React from 'react';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import 'EnzymeInit';

import { shallow, mount } from 'enzyme';
import ApiProvider from 'components/ApiProvider';
import { config } from 'api/apiManager';

import { IntlProvider } from 'react-intl';

const mockStore = configureMockStore([thunk]);

const MOCKED = {
  api: {
    useMocks: true,
  },
  currentUser: {
    token: null,
  },
};

const onLogin = jest.fn();
const onLogout = jest.fn();
const domain = 'http://abc.com/';

jest.unmock('react-intl');

jest.mock('api/apiManager', () => ({
  config: jest.fn(),
}));

describe('entando-apimanager/ApiProvider', () => {
  let component;
  let store;
  beforeEach(() => {
    store = mockStore(MOCKED);
    jest.clearAllMocks();
    component = shallow((
      <ApiProvider
        useMocks
        domain={domain}
        store={store}
        onLogin={onLogin}
        onLogout={onLogout}
      >
        Hello
      </ApiProvider>
    ));
  });

  it('renders without crashing', () => {
    expect(component.exists()).toEqual(true);
  });

  it('Component ApiProvider call apiManager\'s config method', () => {
    component = mount((
      <IntlProvider locale="en">
        <ApiProvider
          useMocks
          domain={domain}
          store={store}
          onLogin={onLogin}
          onLogout={onLogout}
        >
          How are you
        </ApiProvider>
      </IntlProvider>));
    expect(config).toHaveBeenCalledWith(store, onLogout, onLogin);
  });
});
