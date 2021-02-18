import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { get, isNull } from 'lodash';

import ColumnResizer from 'react-column-resizer';
import { useTable } from 'react-table';

const DataTable = ({
  columns,
  data,
  rowAction,
  canReorder,
  canResize,
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

    tempCols[draggedColIdx] = columnState[droppedColIdx + 1];
    tempCols[droppedColIdx + 1] = columnState[draggedColIdx];
    setColumnState(tempCols);
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
        { className: 'table table-striped table-bordered' },
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
                canReorder && column.id !== 'actions' ? {
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
            ...(canResize && headerGroups[0].headers.length - 1 > idx ? [<ColumnResizer className="columnResizer" />] : []),
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
                ...(canResize && row.cells.length - 1 > idx ? [<td className="colForResize" />] : []),
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
  canReorder: PropTypes.bool,
  canResize: PropTypes.bool,
  classNames: PropTypes.shape({
    table: PropTypes.string,
    headerGroup: PropTypes.string,
    header: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    row: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    cell: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  }),
};

DataTable.defaultProps = {
  columns: [],
  data: [],
  rowAction: null,
  canReorder: false,
  canResize: false,
  classNames: {
    table: '',
    headerGroup: '',
    header: '',
    row: '',
    cell: '',
  },
};

export default DataTable;