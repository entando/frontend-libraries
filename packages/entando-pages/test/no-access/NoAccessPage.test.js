import React from 'react';
import 'EnzymeInit';

import { shallow } from 'enzyme';
import NoAccessPage from 'no-access/NoAccessPage';

const gotoHome = jest.fn();

describe('pages/NoAccessPage', () => {
  let component;
  beforeEach(() => {
    component = shallow(<NoAccessPage />);
  });

  it('renders without crashing', () => {
    expect(component.exists()).toEqual(true);
  });

  it('component root has class NoAccessPage', () => {
    expect(component.hasClass('NoAccessPage')).toBe(true);
  });

  it('component calls gotoHome function', () => {
    component = shallow(<NoAccessPage gotoHome={gotoHome} />);
    component.find('.NoAccessPage__goto-home-button').simulate('click');
    expect(gotoHome).toHaveBeenCalled();
  });
});
