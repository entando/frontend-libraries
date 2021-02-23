import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { isNull, isFunction, get } from 'lodash';
import { DDTable } from '@entando/ddtable';

import ColumnResizer from 'ColumnResizer';
import { useTable } from 'react-table';

const DataTable = ({
  columns,
  data,
  rowAction,
  onColumnReorder,
  columnResizable,
  classNames,
  rowReordering,
}) => {
  const columnResults = useMemo(() => {
    if (isNull(rowAction)) {
      return columns;
    }
    const defaults = {
      attributes: {
        className: 'text-center',
        width: '10%',
      },
      Header: <FormattedMessage id="app.actions" />,
    };

    const { Cell, ...otherActionProps } = rowAction;

    const rowActionProps = {
      ...defaults,
      ...otherActionProps,
      Cell: isFunction(Cell) ? ({ cell: { row } }) => Cell(row) : Cell,
      id: 'actions',
    };

    return [...columns, rowActionProps];
  }, [columns, rowAction]);

  const [columnState, setColumnState] = useState(columnResults);

  const [dragOver, setDragOver] = useState('');

  const handleDragStart = (ev) => {
    const { id } = ev.currentTarget;
    const idx = columnState.findIndex(col => col.accessor === id);
    ev.dataTransfer.setData('colIdx', idx);
  };

  const handleDragOver = e => e.preventDefault();

  const handleDragEnter = ({ currentTarget }) => {
    const { id } = currentTarget;
    setDragOver(id);
  };

  const handleOnDrop = (ev) => {
    const { id } = ev.currentTarget;
    const droppedColIdx = columnState.findIndex(col => col.accessor === id);
    const draggedColIdx = ev.dataTransfer.getData('colIdx');
    const tempCols = [...columnState];

    tempCols[draggedColIdx] = columnState[droppedColIdx];
    tempCols[droppedColIdx] = columnState[draggedColIdx];
    setColumnState(tempCols);

    if (onColumnReorder) {
      const colIds = tempCols.filter(col => !!get(col, 'accessor', false)).map(col => col.accessor);
      onColumnReorder(colIds);
    }

    setDragOver('');
  };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns: columnState, data });

  const determineAttributesProp = ({ attributes }) => {
    if (!attributes) {
      return {};
    }
    return isFunction(attributes) ? attributes(column) : attributes;
  };

  const determineCellAttributesProp = (cell) => {
    const { cellAttributes } = cell.column;
    if (!cellAttributes) {
      return {};
    }
    return isFunction(cellAttributes) ? cellAttributes(cell) : cellAttributes;
  };

  const generateTHead = () => (
    <thead>
      <tr {...headerGroups[0].getHeaderGroupProps([{ className: classNames.headerGroup }])}>
        {headerGroups[0].headers.map((column, idx) => ([
          <th
            {...column.getHeaderProps([
              determineAttributesProp(column),
              { className: classNames.header },
            ])}
            id={column.id}
            key={column.id}
            {...(
              onColumnReorder && column.id !== 'actions' ? {
                draggable: true,
                onDragStart: handleDragStart,
                onDragOver: handleDragOver,
                onDrop: handleOnDrop,
                onDragEnter: handleDragEnter,
                dragOver: column.id === dragOver,
              } : {}
            )}
          >
            {column.render('Header')}
          </th>,
          ...(columnResizable && headerGroups[0].headers.length - 2 > idx ? [<ColumnResizer className="columnResizer" />] : []),
        ]))}
      </tr>
    </thead>
  );

  const generateRow = (row) => {
    prepareRow(row);

    const cells = row.cells.map((cell, idx) => ([
      <td
        {...cell.getCellProps([
          determineCellAttributesProp(cell),
          { className: classNames.cell },
        ])}
      >
        {rowReordering && cell.column.id === columnResults[0].accessor && (
          <DDTable.Handle>
            <button className={[
              rowReordering.dragHandleClassname,
              'btn btn-primary',
            ].join(' ')}>
              <i className="fa fa-arrows" />
            </button>
          </DDTable.Handle>
        )}
        {cell.render('Cell')}
      </td>,
      ...(columnResizable && row.cells.length - 2 > idx ? [<ColumnResizer className="colForResize" />] : []),
    ]));

    const rowProps = row.getRowProps([{
      className: classNames.row,
      rowData: row.original,
    }]);
    
    return rowReordering ? (
      <DDTable.Tr {...rowProps}>{cells}</DDTable.Tr>
    ) : (
      <tr {...rowProps}>{cells}</tr>
    );
  };

  const tableElement = (
    <table
      {...getTableProps([
        { className: 'table table-bordered table-datatable' },
        { className: classNames.table },
      ])}
    >
      {generateTHead()}
      <tbody {...getTableBodyProps()}>
        {rows.map(generateRow)}
      </tbody>
    </table>
  );

  return rowReordering ? (
    <DDTable onDrop={rowReordering.onDrop} PreviewRenderer={rowReordering.previewRender}>
      {tableElement}
    </DDTable>
  ) : tableElement;
};

const CellPropType = PropTypes.oneOfType([
  PropTypes.element,
  PropTypes.string,
  PropTypes.func,
]);

const ColumnPropType = PropTypes.shape({
  Header: CellPropType,
  accessor: PropTypes.string,
  Cell: CellPropType,
  attributes: PropTypes.oneOfType([
    PropTypes.shape({}),
    PropTypes.func,
  ]),
  cellAttributes: PropTypes.oneOfType([
    PropTypes.shape({}),
    PropTypes.func,
  ]),
});

DataTable.propTypes = {
  columns: PropTypes.arrayOf(ColumnPropType),
  data: PropTypes.arrayOf(PropTypes.shape({})),
  rowAction: ColumnPropType,
  columnResizable: PropTypes.bool,
  classNames: PropTypes.shape({
    table: PropTypes.string,
    headerGroup: PropTypes.string,
    header: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    row: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    cell: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  }),
  onColumnReorder: PropTypes.func,
  rowReordering: PropTypes.shape({
    onDrop: PropTypes.func.isRequired,
    previewRender: PropTypes.func.isRequired,
    dragHandleClassname: PropTypes.string,
  }),
};

DataTable.defaultProps = {
  columns: [],
  data: [],
  rowAction: null,
  columnResizable: false,
  classNames: {
    table: '',
    headerGroup: '',
    header: '',
    row: '',
    cell: '',
  },
  onColumnReorder: null,
  rowReordering: null,
};

export default DataTable;
