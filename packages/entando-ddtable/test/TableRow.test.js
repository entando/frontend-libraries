import React from 'react';
import { shallow } from 'enzyme';

import 'EnzymeInit';
import TableRowWrapped, { getHoverType, dropSpec } from 'TableRow';

const TableRow = TableRowWrapped.DecoratedComponent;

global.console.error = jest.fn();

const connectDropTargetMock = arg => (arg);

const ROW_DATA = { id: '1' };
const SOURCE_ITEM = { id: '2' };

const testTable = (
  <TableRow
    connectDropTarget={connectDropTargetMock}
    rowData={ROW_DATA}
  >
    <td>Hello</td>
  </TableRow>
);

const onDropMock = jest.fn();
const SHALLOW_CONTEXT_OPTS = { context: { onDrop: onDropMock } };
const HOVER_TYPE_HIGH = 'high';
const HOVER_TYPE_LOW = 'low';
const HOVER_TYPE_MEDIUM = 'medium';

const getGetHoverTypeArgs = (mouseY, trHeight, trTop) => ([
  {},
  {
    getClientOffset: () => ({ y: mouseY }),
    getItem: () => ({}),
  },
  {
    tr: {
      getBoundingClientRect: () => ({ top: trTop }),
      clientHeight: trHeight,
    },
    notifyDrop: jest.fn(),
    notifyHoverState: jest.fn(),
  },
]);

const callGetHoverType = (mouseY, trHeight, trTop) => {
  const args = getGetHoverTypeArgs(mouseY, trHeight, trTop);
  return getHoverType.apply(this, args);
};


describe('ui/table/TableRow', () => {
  describe('basic rendering', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('raises a warning if used outside of DDTable context', () => {
      shallow(testTable);
      expect(global.console.error).toHaveBeenCalled();
    });
    it('renders correctly in a DDTable context', () => {
      shallow(testTable, SHALLOW_CONTEXT_OPTS);
      expect(global.console.error).not.toHaveBeenCalled();
    });
  });

  describe('basic usage', () => {
    let component;
    beforeEach(() => {
      component = shallow(testTable, SHALLOW_CONTEXT_OPTS);
    });

    it('has DDTable__tr class', () => {
      expect(component.hasClass('DDTable__tr')).toBe(true);
    });

    it('exposes rowData via child context', () => {
      const childContext = component.instance().getChildContext();
      expect(childContext.rowData).toEqual(ROW_DATA);
    });

    it('method notifyHoverState() should set the "hover" state', () => {
      component.setState({ hover: HOVER_TYPE_HIGH });
      component.instance().notifyHoverState(HOVER_TYPE_LOW);
      expect(component.state('hover')).toBe(HOVER_TYPE_LOW);
    });

    it('method notifyHoverState() should leave the "hover" state if equal', () => {
      component.setState({ hover: HOVER_TYPE_LOW });
      component.instance().notifyHoverState(HOVER_TYPE_LOW);
      expect(component.state('hover')).toBe(HOVER_TYPE_LOW);
    });

    it('method notifyDrop() should call onDrop from DDTable context', () => {
      component.instance().notifyDrop(HOVER_TYPE_HIGH, SOURCE_ITEM);
      expect(onDropMock).toHaveBeenCalledWith(HOVER_TYPE_HIGH, SOURCE_ITEM, ROW_DATA);
    });
  });

  describe('while hovering', () => {
    let component;
    beforeEach(() => {
      component = shallow(
        (
          <TableRow
            connectDropTarget={connectDropTargetMock}
            rowData={ROW_DATA}
            isOver
          >
            <td>Hello</td>
          </TableRow>
        ), SHALLOW_CONTEXT_OPTS,
      );
    });

    it('has DDTable__tr--dnd-hover class', () => {
      expect(component.hasClass('DDTable__tr--dnd-hover')).toBe(true);
    });

    it('has DDTable__tr--dnd-hover-low when hover state = low', () => {
      component.setState({ hover: HOVER_TYPE_LOW });
      expect(component.hasClass('DDTable__tr--dnd-hover-low')).toBe(true);
    });

    it('has DDTable__tr--dnd-hover-high when hover state = high', () => {
      component.setState({ hover: HOVER_TYPE_HIGH });
      expect(component.hasClass('DDTable__tr--dnd-hover-high')).toBe(true);
    });
  });

  describe('getHoverType()', () => {
    it('returns "high" if the mouse is in the upper third of the current tr', () => {
      const type = callGetHoverType(5, 30, 0);
      expect(type).toBe(HOVER_TYPE_HIGH);
    });
    it('returns "medium" if the mouse is in the middle third of the current tr', () => {
      const type = callGetHoverType(15, 30, 0);
      expect(type).toBe(HOVER_TYPE_MEDIUM);
    });
    it('returns "low" if the mouse is in the middle third of the current tr', () => {
      const type = callGetHoverType(25, 30, 0);
      expect(type).toBe(HOVER_TYPE_LOW);
    });
  });

  describe('dropSpec', () => {
    describe('.drop()', () => {
      it('calls component.notifyDrop()', () => {
        const args = getGetHoverTypeArgs(25, 30, 0);
        dropSpec.drop.apply(this, args);
        expect(args[2].notifyDrop).toHaveBeenCalledWith(HOVER_TYPE_LOW, {});
      });
    });
    describe('.hover()', () => {
      it('calls component.notifyHoverState() to set the current hover state', () => {
        const args = getGetHoverTypeArgs(25, 30, 0);
        dropSpec.hover.apply(this, args);
        expect(args[2].notifyHoverState).toHaveBeenCalledWith(HOVER_TYPE_LOW);
      });
    });
  });
});
