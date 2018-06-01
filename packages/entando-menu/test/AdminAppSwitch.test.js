import React from 'react';
import 'test/EnzymeInit';

import { shallow } from 'enzyme';
import AdminAppSwitch from 'ui/menu/AdminAppSwitch';

describe('ui/menu/AdminAppSwitch', () => {
  let component;
  beforeEach(() => {
    component = shallow(<AdminAppSwitch />);
  });

  it('renders without crashing', () => {
    expect(component.exists()).toEqual(true);
  });

  it('is a <li> with class AdminAppSwitch', () => {
    expect(component.hasClass('AdminAppSwitch')).toBe(true);
    expect(component.is('li')).toBe(true);
  });

  it('have icon pficon-help', () => {
    expect(component.find('i').hasClass('fa fa-th')).toEqual(true);
  });
});
