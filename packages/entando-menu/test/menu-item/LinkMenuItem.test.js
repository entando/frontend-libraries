import React from 'react';
import 'EnzymeInit';
import { shallow } from 'enzyme';

import LinkMenuItem from 'menu-item/LinkMenuItem';

const ID = 'item-id';
const LABEL = 'Link label';
const ROUTE = 'mockRoute';

let component;

describe('ui/menu/menu-item/LinkMenuItem', () => {
  describe('basic usage', () => {
    beforeEach(() => {
      component = shallow((
        <LinkMenuItem
          id={ID}
          label={LABEL}
          to={ROUTE}
        />
      ));
    });

    it('should render a patternfly compliant menu item (<li>)', () => {
      expect(component.is('li')).toBe(true);
    });

    it('should have LinkMenuItem class', () => {
      expect(component.hasClass('LinkMenuItem')).toBe(true);
    });

    it('should render a NavLink if the isNav property is used', () => {
      component = shallow((
        <LinkMenuItem
          id={ID}
          label={LABEL}
          to={ROUTE}
          isNav
        />
      ));
      expect(component.find('NavLink').length).toBe(1);
    });

    it('should render a Link if the isNav property is not used', () => {
      component = shallow((
        <LinkMenuItem
          id={ID}
          label={LABEL}
          to={ROUTE}
        />
      ));
      expect(component.find('Link').length).toBe(1);
    });
  });

  describe('with prop active', () => {
    it('should have "active" class if prop active === true', () => {
      component = shallow((
        <LinkMenuItem
          id={ID}
          label={LABEL}
          to={ROUTE}
          active
        />
      ));
      expect(component.hasClass('active')).toBe(true);
    });

    it('should have "active" class if prop active === false', () => {
      component = shallow((
        <LinkMenuItem
          id={ID}
          label={LABEL}
          to={ROUTE}
        />
      ));
      expect(component.hasClass('active')).toBe(false);
    });
  });

  describe('with prop pullRight', () => {
    it('should have "pull-right" class if prop pullRight === true', () => {
      component = shallow((
        <LinkMenuItem
          id={ID}
          label={LABEL}
          to={ROUTE}
          pullRight
        />
      ));
      expect(component.hasClass('pull-right')).toBe(true);
    });

    it('should have "pull-right" class if prop pullRight === false', () => {
      component = shallow((
        <LinkMenuItem
          id={ID}
          label={LABEL}
          to={ROUTE}
        />
      ));
      expect(component.hasClass('pull-right')).toBe(false);
    });
  });

  describe('with prop pullRight', () => {
    it('should pass "className" to the root <li> element', () => {
      const testClass = 'test-class';
      component = shallow((
        <LinkMenuItem
          id={ID}
          label={LABEL}
          to={ROUTE}
          className={testClass}
        />
      ));
      expect(component.hasClass(testClass)).toBe(true);
    });

    it('should pass "to" to the internal Link element', () => {
      component = shallow((
        <LinkMenuItem
          id={ID}
          label={LABEL}
          to={ROUTE}
        />
      ));
      expect(component.find('Link').prop('to')).toBe(ROUTE);
    });
  });
});
