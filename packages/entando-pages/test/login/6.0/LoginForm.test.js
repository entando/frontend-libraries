import React from 'react';
import 'EnzymeInit';

import { shallow, mount } from 'enzyme';
import LoginForm from 'login/6.0/LoginForm';

import { IntlProvider } from 'react-intl';

const performLoginMock = jest.fn();
const setLanguageMock = jest.fn();

jest.unmock('react-intl');

describe('ui/login/LoginForm', () => {
  let component;
  beforeEach(() => {
    component = shallow((
      <LoginForm performLogin={performLoginMock} setLanguage={setLanguageMock} />
    ));
  });

  it('renders without crashing', () => {
    expect(component.exists()).toEqual(true);
  });

  it('component root has class LoginForm', () => {
    expect(component.hasClass('LoginForm')).toBe(true);
  });
  // Using mount when testing input refs. It's important that Component is a Class Component
  it('Component LoginForm call performLogin ', () => {
    component = mount((
      <IntlProvider locale="en">
        <LoginForm performLogin={performLoginMock} setLanguage={setLanguageMock} />
      </IntlProvider>));
    const preventDefault = jest.fn();
    component.find('.LoginForm__username-input').first().getDOMNode().value = 'username';
    component.find('.LoginForm__password-input').first().getDOMNode().value = 'password';
    component.find('Form').simulate('submit', { preventDefault });
    expect(performLoginMock).toHaveBeenCalledWith('username', 'password');
    expect(preventDefault).toHaveBeenCalled();
  });
});
