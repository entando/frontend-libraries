import React from 'react';
import 'EnzymeInit';

import { shallow, mount } from 'enzyme';
import DropdownToggle from 'menu-item/DropdownToggle';

const eventMock = {
  preventDefault: jest.fn(),
};

describe('ui/menu/menu-item/DropdownToggle', () => {
  it('must require bsRole prop', () => {
    global.console.error = jest.fn();

    shallow(<DropdownToggle />);
    expect(global.console.error).toHaveBeenCalled();
    const errorMessage = global.console.error.mock.calls[0][0];
    expect(errorMessage).toMatch(/required/);
  });

  it('must have an "anchor" ref to its <a> node', () => {
    const component = mount(<DropdownToggle bsRole="toggle" />);
    expect(component.instance().anchor).toBeDefined();
  });

  describe('on click', () => {
    it('must ev.preventDefault() to avoid reloading the page', () => {
      const component = shallow(<DropdownToggle bsRole="toggle" />);
      component.simulate('click', eventMock);
      expect(eventMock.preventDefault).toHaveBeenCalled();
    });

    it('must execute onClick', () => {
      const clickHandler = jest.fn();
      const component = shallow(<DropdownToggle bsRole="toggle" onClick={clickHandler} />);
      component.simulate('click', eventMock);
      expect(clickHandler).toHaveBeenCalledWith(eventMock);
    });
  });
});
