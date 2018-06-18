import React from 'react';
import { shallow } from 'enzyme';

import 'EnzymeInit';
import DragHandleWrapped, { collect, dragSource } from 'DragHandle';

const DragHandle = DragHandleWrapped.DecoratedComponent;

global.console.error = jest.fn();

const connectDragSourceMock = arg => (arg);
const connectDragPreviewMock = arg => (arg);
const basicDragHandle = (
  <DragHandle
    connectDragSource={connectDragSourceMock}
    connectDragPreview={connectDragPreviewMock}
  >
    empty
  </DragHandle>
);
const ROW_DATA = { id: '42' };
const SHALLOW_CONTEXT_OPTS = {
  context: {
    onDragBegin: jest.fn(),
    onDragEnd: jest.fn(),
    rowData: ROW_DATA,
  },
};

describe('ui/table/DragHandle', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  describe('basic rendering', () => {
    it('raises a warning if used outside of DDTable context', () => {
      shallow(basicDragHandle);
      expect(global.console.error).toHaveBeenCalled();
    });
    it('renders correctly in a DDTable context', () => {
      shallow(basicDragHandle, SHALLOW_CONTEXT_OPTS);
      expect(global.console.error).not.toHaveBeenCalled();
    });
    it('can render a custom component', () => {
      const customPresentationComponent = <button>GRIP</button>;
      const customDragHandle = (
        <DragHandle
          connectDragSource={connectDragSourceMock}
          connectDragPreview={connectDragPreviewMock}
        >
          {customPresentationComponent}
        </DragHandle>
      );
      const component = shallow(customDragHandle, SHALLOW_CONTEXT_OPTS);
      expect(component.contains(customPresentationComponent)).toBe(true);
    });
  });

  describe('method', () => {
    let component;
    beforeEach(() => {
      component = shallow(basicDragHandle, SHALLOW_CONTEXT_OPTS);
    });
    it('.onDragBegin() calls onDragBegin method from context with the row data from context', () => {
      component.instance().onDragBegin();
      expect(component.context('onDragBegin')).toHaveBeenCalledWith(component.context('rowData'));
    });
    it('.onDragEnd() calls onDragBegin method from context with the row data from context', () => {
      component.instance().onDragEnd();
      expect(component.context('onDragEnd')).toHaveBeenCalledWith(component.context('rowData'));
    });
    it('.getRowData() returns the row data from context', () => {
      const res = component.instance().getRowData();
      expect(res).toEqual(component.context('rowData'));
    });
  });

  describe('react-dnd config', () => {
    const DRAG_SOURCE = 'DRAG_SOURCE';
    const DRAG_PREVIEW = 'DRAG_PREVIEW';
    const IS_DRAGGING = true;
    const monitorMock = {
      isDragging: jest.fn().mockReturnValue(IS_DRAGGING),
    };
    const connectMock = {
      dragSource: jest.fn().mockReturnValue(DRAG_SOURCE),
      dragPreview: jest.fn().mockReturnValue(DRAG_PREVIEW),
    };
    let component;
    let instance;
    beforeEach(() => {
      component = shallow(basicDragHandle, SHALLOW_CONTEXT_OPTS);
      instance = component.instance();
    });

    describe('.collect()', () => {
      let result;
      beforeEach(() => {
        result = collect(connectMock, monitorMock);
      });
      it('should map monitor.isDragging() to "isDragging"', () => {
        expect(monitorMock.isDragging).toHaveBeenCalled();
        expect(result.isDragging).toBe(IS_DRAGGING);
      });
      it('should map connect.dragSource() to "connectDragSource"', () => {
        expect(connectMock.dragSource).toHaveBeenCalled();
        expect(result.connectDragSource).toBe(DRAG_SOURCE);
      });
      it('should map connect.dragPreview() to "connectDragPreview"', () => {
        expect(connectMock.dragPreview).toHaveBeenCalled();
        expect(result.connectDragPreview).toBe(DRAG_PREVIEW);
      });
    });

    describe('dragSource', () => {
      it('.isDragging() should return true', () => {
        expect(dragSource.isDragging()).toBe(true);
      });
      it('.canDrag() should return true', () => {
        expect(dragSource.canDrag()).toBe(true);
      });
      it('.beginDrag() should call component.onDragBegin()', () => {
        dragSource.beginDrag(ROW_DATA, monitorMock, instance);
        expect(component.context('onDragBegin')).toHaveBeenCalledWith(ROW_DATA);
      });
      it('.beginDrag() should return the component context row data', () => {
        const res = dragSource.beginDrag(ROW_DATA, monitorMock, instance);
        expect(res).toBe(component.context('rowData'));
      });
      it('.endDrag() should call component.onDragEnd()', () => {
        dragSource.endDrag(ROW_DATA, monitorMock, instance);
        expect(component.context('onDragEnd')).toHaveBeenCalledWith(ROW_DATA);
      });
    });
  });
});
