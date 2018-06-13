import React from 'react';
import 'EnzymeInit';

import { shallow } from 'enzyme';
import HelpMenu from 'HelpMenu';

const HELP_TEXT = 'Help';


describe('ui/menu/HelpMenu', () => {
  let component;
  beforeEach(() => {
    component = shallow(<HelpMenu helpTextProperty={HELP_TEXT} />);
  });

  it('renders without crashing', () => {
    expect(component.exists()).toEqual(true);
  });

  it('is a <li> with class HelpMenu', () => {
    expect(component.hasClass('HelpMenu')).toBe(true);
    expect(component.is('li')).toBe(true);
  });

  it('have icon pficon-help', () => {
    expect(component.find('i').hasClass('fa pficon-help')).toEqual(true);
  });
});
