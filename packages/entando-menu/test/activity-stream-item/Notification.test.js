import React from 'react';
import 'EnzymeInit';

import { shallow, mount } from 'enzyme';
import Notification from 'activity-stream-item/Notification';

const NOTIFICATION = (<Notification
  key="notification2"
  id={1}
  username="Gianni"
  notification="ha modificato un contenuto"
  targetName="contenuto test"
  onClickUsername={() => {}}
  onClickTargetName={() => {}}
  onClickLike={() => {}}
  modificationDate={new Date('2018,02,13 05:32:00')}
/>);

describe('ui/menu/activity-stream-item/Notification', () => {
  let component;
  beforeEach(() => {
    component = shallow(NOTIFICATION);
  });

  it('renders without crashing', () => {
    expect(component.exists()).toEqual(true);
  });

  describe('on click', () => {
    const eventMock = {
      preventDefault: jest.fn(),
    };
    beforeEach(() => {
      component = mount(NOTIFICATION);
    });

    it('should call onSubmit when clicking on the submit button', () => {
      component.find('Form').simulate('submit', eventMock);
      expect(eventMock.preventDefault).toHaveBeenCalled();
    });

    it('should call clickUsername when clicking ', () => {
      component.find('.Notification__user').simulate('click', eventMock);
      expect(eventMock.preventDefault).toHaveBeenCalled();
    });

    it('should call onClickTargetName when clicking ', () => {
      component.find('.Notification__link').simulate('click', eventMock);
      expect(eventMock.preventDefault).toHaveBeenCalled();
    });

    it('should call onClickLike when clicking ', () => {
      component.find('.Notification__like').simulate('click', eventMock);
      expect(eventMock.preventDefault).toHaveBeenCalled();
    });
  });
});
