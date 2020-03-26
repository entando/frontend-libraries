import React from 'react';
import 'EnzymeInit';

import { shallow } from 'enzyme';
import LoginPage from 'login/6.0/LoginPage';

const CHILD = '<span>child for LoginPage</span>';

describe('ui/login/LoginPage', () => {
  let component;
  beforeEach(() => {
    component = shallow(<LoginPage />);
  });

  it('renders without crashing', () => {
    expect(component.exists()).toEqual(true);
  });

  it('component root has class LoginPage', () => {
    expect(component.hasClass('LoginPage')).toBe(true);
  });

  it('component root with child ', () => {
    component = shallow(<LoginPage> {CHILD} </LoginPage>);
    expect(component.contains(CHILD)).toBe(true);
  });

  it('component root without child ', () => {
    expect(component.find('.LoginPage__right-wrapper').prop('children')).toEqual([null, expect.any(Object)]);
  });
});
