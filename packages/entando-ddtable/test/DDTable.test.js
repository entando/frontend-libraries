import React from 'react';
import { shallow } from 'enzyme';

import 'EnzymeInit';
import DDTable from 'DDTable';

const testTable = (
  <table className="table table-bordered table-hover table-treegrid">
    <thead key="thead">
      <tr><th>Header</th></tr>
    </thead>
    <tbody key="tbody">
      <tr><td>Hello</td></tr>
    </tbody>
  </table>
);

describe('ui/table/DDTable', () => {
  describe('basic usage', () => {
    let component;
    let childContext;
    beforeEach(() => {
      component = shallow(<DDTable>{testTable}</DDTable>);
      childContext = component.instance().getChildContext();
    });

    it('renders without crashing', () => {
      expect(component.exists()).toBe(true);
    });

    it('has class DDTable', () => {
      expect(component.hasClass('DDTable')).toBe(true);
    });

    it('renders its children', () => {
      expect(component.contains(testTable)).toBe(true);
    });

    it('is not in dragging state', () => {
      expect(component.state('isDragging')).toBe(false);
    });

    it('renders the TableDragLayer', () => {
      expect(component.find('DragLayer(TableDragLayer)').exists()).toBe(true);
    });

    it('provides the TableDragLayer with the PreviewRenderer', () => {
      expect(component.find('DragLayer(TableDragLayer)').prop('PreviewRenderer')).toBeDefined();
    });

    it('context method onDragBegin() should set state.isDragging = true', () => {
      childContext.onDragBegin();
      expect(component.state('isDragging')).toBe(true);
    });
  });

  describe('while dragging', () => {
    let component;
    let childContext;

    beforeEach(() => {
      component = shallow(<DDTable>{testTable}</DDTable>);
      childContext = component.instance().getChildContext();
      component.setState({ isDragging: true });
    });

    it('has class DDTable--dragging', () => {
      expect(component.hasClass('DDTable--dragging')).toBe(true);
    });

    it('childContext method onDragEnd() should set state.isDragging = false', () => {
      childContext.onDragEnd();
      expect(component.state('isDragging')).toBe(false);
    });
  });

  describe('prop', () => {
    it('"onDrop" should be passed down to the child context', () => {
      const onDropFunc = () => {};
      const component = shallow(<DDTable onDrop={onDropFunc}>{testTable}</DDTable>);
      expect(component.instance().getChildContext().onDrop).toBe(onDropFunc);
    });
    it('"onDrop" should have a default value when not provided', () => {
      const component = shallow(<DDTable>{testTable}</DDTable>);
      expect(component.instance().getChildContext().onDrop).toBeDefined();
    });

    it('"PreviewRenderer" should be passed down to the DragLayer', () => {
      const TestRenderer = () => <span>Test renderer</span>;
      const component = shallow(<DDTable PreviewRenderer={TestRenderer}>{testTable}</DDTable>);
      expect(component.find('DragLayer(TableDragLayer)').prop('PreviewRenderer')).toBe(TestRenderer);
    });
    it('"PreviewRenderer" should have a default value that is a component', () => {
      const DefaultPreviewRenderer = DDTable.defaultProps.PreviewRenderer;
      const defaultPreview = shallow(<DefaultPreviewRenderer />);
      expect(defaultPreview.exists()).toBe(true);
    });
  });
});
