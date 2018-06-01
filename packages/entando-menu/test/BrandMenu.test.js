import React from 'react';
import 'test/EnzymeInit';

import { shallow } from 'enzyme';
import BrandMenu from 'ui/menu/BrandMenu';

const TITLE = 'Title';
const CHILD_ID = 'child-id';
const CHILD = <li className="child" id={CHILD_ID}><a href="#">test</a></li>;


describe('ui/menu/BrandMenu', () => {
  describe('basic usage', () => {
    let component;
    beforeEach(() => {
      component =
      shallow(<BrandMenu title={TITLE} />);
    });

    it('renders BrandMenu without crashing', () => {
      expect(component.exists()).toBe(true);
    });

    it('shows the title in BrandMenu__navbar-brand', () => {
      expect(component.find('.BrandMenu__navbar-brand').contains(TITLE)).toBe(true);
    });

    it('should not render first level menu', () => {
      expect(component.find('.BrandMenu__first-level-menu').exists()).toBe(false);
    });
  });

  describe('with header and no children', () => {
    let component;
    beforeEach(() => {
      component =
      shallow(<BrandMenu title={TITLE} header={CHILD} />);
    });

    it('should render header nodes into BrandMenu__navbar-utility', () => {
      expect(component.find('.BrandMenu__navbar-utility').contains(CHILD)).toBe(true);
    });

    it('should not render first level menu', () => {
      expect(component.find('.BrandMenu__first-level-menu').exists()).toBe(false);
    });
  });

  describe('with children and no header', () => {
    let component;
    beforeEach(() => {
      component =
      shallow(<BrandMenu title={TITLE}>{CHILD}</BrandMenu>);
    });

    it('should render an empty BrandMenu__navbar-utility', () => {
      expect(component.find('.BrandMenu__navbar-utility').children().exists()).toBe(false);
    });

    it('should render first level menu', () => {
      expect(component.find('.BrandMenu__first-level-menu').exists()).toBe(true);
    });

    it('should pass "onClick" prop to children', () => {
      const children = component.find('.BrandMenu__first-level-menu').children();
      children.forEach((child) => {
        expect(child.prop('onClick')).toBeDefined();
      });
    });

    it('should pass "active" prop to children', () => {
      const children = component.find('.BrandMenu__first-level-menu').children();
      children.forEach((child) => {
        expect(child.prop('active')).toBeDefined();
      });
    });
  });

  describe('on child click', () => {
    it('should set the state.activeMenu to the child id', () => {
      const component = shallow(<BrandMenu title={TITLE}>{CHILD}</BrandMenu>);
      component.find(`#${CHILD_ID}`).simulate('click');
      expect(component.state().activeMenu).toBe(CHILD_ID);
    });

    it('should set the state.activeMenu to empty if child has a route prop', () => {
      const component = shallow((
        <BrandMenu title={TITLE}><span id={CHILD_ID} route="test" /></BrandMenu>
      ));
      component.find(`#${CHILD_ID}`).simulate('click');
      expect(component.state().activeMenu).toBe('');
    });
  });
});
