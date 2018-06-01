import React from 'react';
import 'EnzymeInit';

import { shallow } from 'enzyme';
import ActivityStream from 'ActivityStream';

const mockEvent = {
  preventDefault: jest.fn(),

};

let component;
describe('ui/menu/ActivityStream', () => {
  beforeEach(() => {
    component = shallow(<ActivityStream />);
  });

  it('renders without crashing', () => {
    expect(component.exists()).toEqual(true);
  });

  it('is a <li> with class ActivityStream', () => {
    expect(component.hasClass('ActivityStream')).toBe(true);
    expect(component.is('div')).toBe(true);
  });

  describe('on click', () => {
    beforeEach(() => {
      component = shallow(<ActivityStream />);
    });

    it('verify expand toggle', () => {
      component.find('.drawer-pf-toggle-expand').simulate('click', mockEvent);
      expect(component.find('.drawer-pf').hasClass('drawer-pf-expanded')).toBe(true);
      expect(mockEvent.preventDefault).toHaveBeenCalled();
    });

    it('verify close drawer', () => {
      component.find('.drawer-pf-close').simulate('click', mockEvent);
      expect(mockEvent.preventDefault).toHaveBeenCalled();
    });
  });
});
