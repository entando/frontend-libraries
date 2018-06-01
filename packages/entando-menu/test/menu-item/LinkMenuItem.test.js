import React from 'react';
import 'test/EnzymeInit';
import { shallow } from 'enzyme';

import LinkMenuItem from 'ui/menu/menu-item/LinkMenuItem';

const ID = 'item-id';
const LABEL = 'Link label';
const ROUTE = 'mockRoute';
const PARAMS = { id: '6' };
const SEARCH_PARAMS = { lang: 'ita' };

let component;

describe('ui/menu/menu-item/LinkMenuItem', () => {
  describe('basic usage', () => {
    beforeEach(() => {
      component = shallow((
        <LinkMenuItem
          id={ID}
          label={LABEL}
          route={ROUTE}
        />
      ));
    });
    it('should render a patternfly compliant menu item (<li>)', () => {
      expect(component.is('li')).toBe(true);
    });

    it('should have LinkMenuItem class', () => {
      expect(component.hasClass('LinkMenuItem')).toBe(true);
    });
  });

  describe('with prop active', () => {
    it('should have "active" class if prop active === true', () => {
      component = shallow((
        <LinkMenuItem
          id={ID}
          label={LABEL}
          route={ROUTE}
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
          route={ROUTE}
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
          route={ROUTE}
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
          route={ROUTE}
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
          route={ROUTE}
          className={testClass}
        />
      ));
      expect(component.hasClass(testClass)).toBe(true);
    });
    it('should pass "route" to the internal Link element', () => {
      component = shallow((
        <LinkMenuItem
          id={ID}
          label={LABEL}
          route={ROUTE}
        />
      ));
      expect(component.find('Link').prop('route')).toBe(ROUTE);
    });
    it('should pass "params" to the internal Link element', () => {
      component = shallow((
        <LinkMenuItem
          id={ID}
          label={LABEL}
          route={ROUTE}
          params={PARAMS}
        />
      ));
      expect(component.find('Link').prop('params')).toBe(PARAMS);
    });
    it('should pass "searchParams" to the internal Link element', () => {
      component = shallow((
        <LinkMenuItem
          id={ID}
          label={LABEL}
          route={ROUTE}
          searchParams={SEARCH_PARAMS}
        />
      ));
      expect(component.find('Link').prop('searchParams')).toBe(SEARCH_PARAMS);
    });
  });
});
