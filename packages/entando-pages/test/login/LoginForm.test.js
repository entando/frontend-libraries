import React from 'react';
import 'EnzymeInit';

import { shallow, mount } from 'enzyme';
import LoginForm from 'login/LoginForm';

import { IntlProvider } from 'react-intl';

const performLoginMock = () => new Promise(() => {});
const setLanguageMock = jest.fn();

jest.unmock('react-intl');

describe('ui/login/LoginForm', () => {
  let component;
  beforeEach(() => {
    component = shallow((
      <LoginForm
        performLogin={performLoginMock}
        setLanguage={setLanguageMock}
        intl={{ formatMessage: jest.fn() }}
      />
    ));
  });

  it('renders without crashing', () => {
    expect(component.exists()).toEqual(true);
  });

  it('component root has class LoginPage__form', () => {
    expect(component.hasClass('LoginPage__form')).toBe(true);
  });
  // Using mount when testing input refs. It's important that Component is a Class Component
  it('Component LoginForm call performLogin ', () => {
    component = mount((
      <IntlProvider locale="en">
        <LoginForm
          performLogin={performLoginMock}
          setLanguage={setLanguageMock}
          intl={{ formatMessage: jest.fn() }}
        />
      </IntlProvider>));
    const preventDefault = jest.fn();
    component.find('.LoginPage__input').first();
    component.find('form').simulate('submit', { preventDefault });
    expect(preventDefault).toHaveBeenCalled();
  });
});
