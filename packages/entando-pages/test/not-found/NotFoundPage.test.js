import React from 'react';
import 'EnzymeInit';

import { shallow } from 'enzyme';
import NotFoundPage from 'not-found/NotFoundPage';

const gotoHome = jest.fn();

describe('ui/login/NotFoundPage', () => {
  let component;
  beforeEach(() => {
    component = shallow(<NotFoundPage />);
  });

  it('renders without crashing', () => {
    expect(component.exists()).toEqual(true);
  });

  it('component root has class NotFoundPage', () => {
    expect(component.hasClass('ErrorPages')).toBe(true);
  });

  it('component calls gotoHome function', () => {
    component = shallow(<NotFoundPage gotoHome={gotoHome} />);
    component.find('.ErrorPages__goto-home-button').simulate('click');
    expect(gotoHome).toHaveBeenCalled();
  });
});
