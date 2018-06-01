import React from 'react';
import 'test/EnzymeInit';

import { shallow } from 'enzyme';
import UserDropdown from 'ui/menu/UserDropdown';

const USERNAME = 'Pippo';

describe('ui/menu/UserDropdown', () => {
  it('renders without crashing', () => {
    const component = shallow(<UserDropdown userName={USERNAME} />);
    expect(component.exists()).toEqual(true);
  });

  it('is an NavDropdown with class UserDropdown and the username', () => {
    const component = shallow(<UserDropdown userName={USERNAME} />);
    expect(component.hasClass('UserDropdown')).toBe(true);
    expect(component.is('NavDropdown')).toBe(true);
    const title = shallow(component.props().title);
    expect(title.contains(USERNAME)).toBe(true);
  });
});
