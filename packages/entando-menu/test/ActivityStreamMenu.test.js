import React from 'react';
import 'EnzymeInit';

import { shallow } from 'enzyme';
import ActivityStreamMenu from 'ActivityStreamMenu';

describe('ActivityStreamMenu', () => {
  let component;
  beforeEach(() => {
    component = shallow(<ActivityStreamMenu />);
  });
  it('renders without crashing', () => {
    expect(component.exists()).toEqual(true);
  });
  it('is a <li> with class HelpMenu', () => {
    expect(component.hasClass('ActivityStreamMenu')).toBe(true);
    expect(component.is('li')).toBe(true);
  });
  describe(' on click', () => {
    const mockEvent = {
      preventDefault: jest.fn(),
    };
    component = shallow(<ActivityStreamMenu />);
    it('simulate click icon bell', () => {
      component.find('a').simulate('click', mockEvent);
      expect(mockEvent.preventDefault).toHaveBeenCalled();
    });
  });
});
