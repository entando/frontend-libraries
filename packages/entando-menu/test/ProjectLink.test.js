import React from 'react';
import 'test/EnzymeInit';

import { shallow } from 'enzyme';
import ProjectLink from 'ui/menu/ProjectLink';

const PROJECT_LINK = 'http://www.entando.com';
const PROJECT_NAME = 'Entando Portal';

describe('ui/menu/ProjectLink', () => {
  let component;
  beforeEach(() => {
    component = shallow(<ProjectLink
      projectLink={PROJECT_LINK}
      projectName={PROJECT_NAME}
    />);
  });
  it('renders without crashing', () => {
    expect(component.exists()).toEqual(true);
  });

  it('is an <li> element', () => {
    expect(component.is('li')).toBe(true);
  });

  it('contains ProjectLink class', () => {
    expect(component.hasClass('ProjectLink')).toBe(true);
  });

  it('contains an icon node', () => {
    expect(component.find('i').hasClass('fa fa-globe')).toEqual(true);
  });
});
