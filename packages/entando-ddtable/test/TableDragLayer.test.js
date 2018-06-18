import React from 'react';
import { shallow } from 'enzyme';

import 'EnzymeInit';
import TableDragLayerWrapped, { collect, getItemStyles } from 'TableDragLayer';

const TableDragLayer = TableDragLayerWrapped.DecoratedComponent;

const PreviewRendererMock = () => <span>Preview</span>;
const monitorMock = {
  getItem: jest.fn().mockReturnValue({}),
  getInitialSourceClientOffset: jest.fn().mockReturnValue({ x: 6, y: 56 }),
  getDifferenceFromInitialOffset: jest.fn().mockReturnValue({ x: 6, y: 56 }),
  isDragging: jest.fn().mockReturnValue(false),
};

describe('ui/table/TableDragLayer', () => {
  describe('basic usage', () => {
    it('renders without crashing', () => {
      const component = shallow(<TableDragLayer PreviewRenderer={PreviewRendererMock} />);
      expect(component.exists()).toBe(true);
    });
    xit('does not render anything if not dragging (default)', () => {
      const component = shallow(<TableDragLayer PreviewRenderer={PreviewRendererMock} />);
      expect(component.children().length).toBe(0);
    });
  });

  xdescribe('when dragging', () => {
    let component;
    beforeEach(() => {
      component = shallow(<TableDragLayer isDragging PreviewRenderer={PreviewRendererMock} />);
    });

    it('renders the drag layer', () => {
      expect(component.children().length).toBe(1);
    });

    it('renders the preview', () => {
      expect(component.find('PreviewRendererMock').exists()).toBe(true);
    });
  });

  xdescribe('react-dnd collect() function', () => {
    const result = collect(monitorMock);
    const propNames = ['item', 'initialOffset', 'differenceOffset', 'isDragging'];

    propNames.forEach((propName) => {
      it(`returns the ${propName} prop`, () => {
        expect(result[propName]).toBeDefined();
      });
    });
  });

  xdescribe('react-dnd getItemStyles() function', () => {
    const propsMock = {
      initialOffset: { x: 5, y: 10 },
      differenceOffset: { x: 1, y: 2 },
    };

    const elementMock = {
      getBoundingClientRect: () => ({ top: 100 }),
    };

    it('should return "display: none" if initialOffset is falsy', () => {
      const res = getItemStyles({}, null);
      expect(res).toEqual({ display: 'none' });
    });
    it('should return "display: none" if there is not reference to root element', () => {
      const res = getItemStyles(propsMock, null);
      expect(res).toEqual({ display: 'none' });
    });

    it('should return "display: none" if there is not reference to root element', () => {
      const res = getItemStyles(propsMock, elementMock);
      expect(res).toEqual({
        WebkitTransform: 'translate(30px, -88px)',
        transform: 'translate(30px, -88px)',
      });
    });
  });
});
