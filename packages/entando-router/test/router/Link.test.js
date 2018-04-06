import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Link from 'router/components/Link';
import { gotoPath, routeToPath } from '../../modules/router/router';

configure({ adapter: new Adapter() });

jest.mock('../../modules/router/router');

const CLASS_NAME = 'randomClassName';
const MOCK_ROUTE = 'fakeRoute';
const LINK_TEXT = 'Go to fake route';
const MOCK_PATH = '/fake/route/path';


describe('router/components/Link', () => {
  describe('default usage:', () => {
    let component;

    beforeEach(() => {
      routeToPath.mockImplementationOnce(() => MOCK_PATH);
      component = shallow(<Link className={CLASS_NAME} route={MOCK_ROUTE}>{LINK_TEXT}</Link>);
    });

    it('renders without crashing', () => {
      expect(component.exists()).toEqual(true);
    });

    it('should show the specified text', () => {
      expect(component.text()).toEqual(LINK_TEXT);
    });

    it('should be rendered with an <a> element', () => {
      expect(component.is('a')).toBe(true);
    });

    it('should render the route name in a data-route attribute', () => {
      expect(component.is(`[data-route="${MOCK_ROUTE}"]`)).toBe(true);
    });

    it('should pass the className down to the <a> element', () => {
      expect(component.hasClass(CLASS_NAME)).toBe(true);
    });

    describe('onClick', () => {
      let mockEvent;

      beforeEach(() => {
        mockEvent = { preventDefault: jest.fn() };
      });
      afterEach(() => {
        mockEvent.preventDefault.mockReset();
        gotoPath.mockReset();
      });

      it('should call event.preventDefault()', () => {
        component.simulate('click', mockEvent);
        expect(mockEvent.preventDefault).toBeCalled();
      });
      it('should call router.gotoPath()', () => {
        component.simulate('click', mockEvent);
        expect(gotoPath).toBeCalled();
        expect(gotoPath).toBeCalledWith('push', MOCK_PATH);
      });
    });
  });

  describe('using prop "replace"', () => {
    let component;

    beforeEach(() => {
      routeToPath.mockImplementationOnce(() => MOCK_PATH);
      component = shallow((
        <Link
          replace
          className={CLASS_NAME}
          route={MOCK_ROUTE}
        >
          {LINK_TEXT}
        </Link>
      ));
    });

    describe('onClick', () => {
      let mockEvent;

      beforeEach(() => {
        mockEvent = { preventDefault: jest.fn() };
      });
      afterEach(() => {
        mockEvent.preventDefault.mockReset();
        gotoPath.mockReset();
      });

      it('should call event.preventDefault()', () => {
        component.simulate('click', mockEvent);
        expect(mockEvent.preventDefault).toBeCalled();
      });
      it('should call router.gotoPath()', () => {
        component.simulate('click', mockEvent);
        expect(gotoPath).toBeCalled();
        expect(gotoPath).toBeCalledWith('replace', MOCK_PATH);
      });
    });
  });
});
