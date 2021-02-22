import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { isNull } from 'lodash';

import ColumnResizer from 'ColumnResizer';
import { useTable } from 'react-table';

const DataTable = ({
  columns,
  data,
  rowAction,
  onColumnReorder,
  columnResizable,
  classNames,
}) => {
  const columnResults = useMemo(() => {
    if (!isNull(rowAction)) {
      const defaults = {
        attributes: {
          className: 'text-center',
          width: '10%',
        },
        Header: <FormattedMessage id="app.actions" />,
      };

      const { Cell, Header } = rowAction;
      const rowActionProps = {
        ...defaults,
        Header,
        Cell: typeof Cell === 'function' ? ({ cell: { row } }) => Cell(row) : Cell,
        id: 'actions',
      };
      return [
        ...columns,
        rowActionProps,
      ];
    }
    return columns;
  }, [columns, rowAction]);
  const [columnState, setColumnState] = useState(columnResults);
  const [dragOver, setDragOver] = useState('');

  const handleDragStart = (ev) => {
    const { id } = ev.target;
    const idx = columnState.findIndex(col => col.accessor === id);
    ev.dataTransfer.setData('colIdx', idx);
  };

  const handleDragOver = e => e.preventDefault();

  const handleDragEnter = ({ target }) => {
    const { id } = target;
    setDragOver(id);
  };

  const handleOnDrop = (ev) => {
    const { id } = ev.target;
    const droppedColIdx = columnState.findIndex(col => col.accessor === id);
    const draggedColIdx = ev.dataTransfer.getData('colIdx');
    const tempCols = [...columnState];

    tempCols[draggedColIdx] = columnState[droppedColIdx];
    tempCols[droppedColIdx] = columnState[draggedColIdx];
    setColumnState(tempCols);
    if (onColumnReorder) {
      const colIds = tempCols.filter(col => !!col.accessor).map(col => col.accessor);
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
  return (
    <table
      {...getTableProps([
        { className: 'table table-striped table-bordered table-datatable' },
        { className: classNames.table },
      ])}
    >
      <thead>
        <tr {...headerGroups[0].getHeaderGroupProps([{ className: classNames.headerGroup }])}>
          {headerGroups[0].headers.map((column, idx) => ([
            <th
              {...column.getHeaderProps([{ className: classNames.header }])}
              id={column.id}
              key={column.id}
              {...(column.attributes ? (
                column.attributes
              ) : {})}
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
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps([{ className: classNames.row }])}>
              {row.cells.map((cell, idx) => ([
                <td
                  {...cell.getCellProps([
                    ('attributes' in cell.column ? (
                      { ...cell.column.attributes }
                    ) : {}),
                    { className: classNames.cell },
                  ])}
                >
                  {cell.render('Cell')}
                </td>,
                ...(columnResizable && row.cells.length - 2 > idx ? [<ColumnResizer className="colForResize" />] : []),
              ]))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
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
};

export default DataTable;
