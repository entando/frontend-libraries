import React from 'react';
import 'EnzymeInit';
import { shallow, mount } from 'enzyme';

import DropdownMenuItem from 'menu-item/DropdownMenuItem';


const LABEL = <b>Label</b>;
const ID = 'mockId';

const children = <b>test</b>;
const eventMock = {
  preventDefault: jest.fn(),
};

let component;

describe('ui/menu/menu-item/DropdownMenuItem', () => {
  describe('basic usage', () => {
    beforeEach(() => {
      component = shallow((
        <DropdownMenuItem id={ID} label={LABEL}>{children}</DropdownMenuItem>
      ));
    });
    it('should render a patternfly compliant menu item (<li>)', () => {
      expect(component.is('li')).toBe(true);
    });

    it('should have DropdownMenuItem class', () => {
      expect(component.hasClass('DropdownMenuItem')).toBe(true);
    });
    it('should render the children', () => {
      expect(component.contains(children)).toBe(true);
    });
    it('should render the label', () => {
      expect(component.contains(LABEL)).toBe(true);
    });
  });

  describe('with prop className', () => {
    it('should add the classes to the component classes', () => {
      const CUSTOM_CLASS = 'custom-class';
      component = shallow((
        <DropdownMenuItem id={ID} label={LABEL} className={CUSTOM_CLASS}>
          {children}
        </DropdownMenuItem>
      ));
      expect(component.hasClass(CUSTOM_CLASS)).toBe(true);
    });
  });

  describe('with prop active', () => {
    it('should have "active" class if prop active === true', () => {
      component = shallow((
        <DropdownMenuItem id={ID} label={LABEL} active>
          {children}
        </DropdownMenuItem>
      ));
      expect(component.hasClass('active')).toBe(true);
    });
    it('should have "active" class if prop active === false', () => {
      component = shallow((
        <DropdownMenuItem id={ID} label={LABEL}>
          {children}
        </DropdownMenuItem>
      ));
      expect(component.hasClass('active')).toBe(false);
    });
  });

  describe('with prop pullRight', () => {
    it('should have "pull-right" class if prop pullRight === true', () => {
      component = shallow((
        <DropdownMenuItem id={ID} label={LABEL} pullRight>
          {children}
        </DropdownMenuItem>
      ));
      expect(component.hasClass('pull-right')).toBe(true);
    });
    it('should have "pull-right" class if prop pullRight === false', () => {
      component = shallow((
        <DropdownMenuItem id={ID} label={LABEL}>
          {children}
        </DropdownMenuItem>
      ));
      expect(component.hasClass('pull-right')).toBe(false);
    });
  });

  describe('on click', () => {
    const onClickMock = jest.fn();

    beforeEach(() => {
      component = mount((
        <DropdownMenuItem
          id={ID}
          label={LABEL}
          onClick={onClickMock}
        >
          {children}
        </DropdownMenuItem>
      ));
    });

    it('should call onClick when clicking on the <a> element', () => {
      component.find('a').first().simulate('click', eventMock);
      expect(onClickMock).toHaveBeenCalled();
    });
    it('should ev.preventDefault() to avoid reloading the page', () => {
      component.find('a').first().simulate('click', eventMock);
      expect(eventMock.preventDefault).toHaveBeenCalled();
    });
  });
});
