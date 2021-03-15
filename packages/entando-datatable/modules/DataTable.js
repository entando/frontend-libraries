import React, { useMemo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { isNull, isFunction, isArray, get } from 'lodash';
import { useTable, useSortBy } from 'react-table';
import { DDTable } from '@entando/ddtable';

import ColumnResizer from 'ColumnResizer';
import SelectCell from 'SelectCell';
import TableBulkSelectContext from 'TableBulkSelectContext';
import { ASC, DESC } from 'const';

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

const DataTable = ({
  columns,
  data,
  rowAction,
  onColumnReorder,
  columnResizable,
  classNames,
  rowAttributes,
  rowReordering,
  onRowSelect,
  selectedRows,
  rowSelectAccessor,
  useSorting,
  sortBy,
  onChangeSort,
}) => {
  const [columnResults, sortingColumns] = useMemo(() => {
    const newColumns = [...columns];

    const determineSortColumn = () => {
      if (isArray(useSorting) && useSorting.length) {
        return [...useSorting];
      } else if (useSorting === true) {
        return columns.map(col => col.accessor);
      }
      return null;
    };

    const sortingColumns = determineSortColumn();

    if (!isNull(onRowSelect)) {
      const colSelect = {
        Header: <SelectCell />,
        attributes: {
          style: { width: '35px' },
        },
        Cell: ({ cell: { row } }) => (
          <SelectCell row={row.original} />
        ),
        id: 'select',
      };
      newColumns.unshift(colSelect);
    }

    if (!isNull(rowAction)) {
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

      newColumns.push(rowActionProps);
    }
    return [newColumns, sortingColumns];
  }, [columns, rowAction, onRowSelect, useSorting]);

  const presetSelectedRows = useMemo(() => [...selectedRows], [selectedRows]);

  const [selectedRowIds, setSelectedRowIds] = useState(presetSelectedRows);
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

  const onRowSelectAll = () => {
    const selectedRows = data.map(row => row[rowSelectAccessor]);
    setSelectedRowIds(selectedRows);
    onRowSelect(selectedRows);
  };

  const onRowSelectNone = () => {
    setSelectedRowIds([]);
    onRowSelect([]);
  };

  const onRowToggleItem = row => {
    const rowId = row[rowSelectAccessor];
    const rowSet = new Set(selectedRowIds);
    if (rowSet.has(rowId)) {
      rowSet.delete(rowId);
    } else {
      rowSet.add(rowId);
    }
    setSelectedRowIds(Array.from(rowSet));
    onRowSelect(Array.from(rowSet));
  };

  const tablePropAttributes =  {
    columns: columnState,
    data,
    ...(sortingColumns && sortingColumns.length
      ? {
        manualSortingBy: true,
        ...(sortBy
          ? { initialState: { sortBy }}
          : {}
        ),
      }
      : {}
    ),
  };

  const useTableProps = [tablePropAttributes];
  
  if (sortingColumns && sortingColumns.length) {
    useTableProps.push(useSortBy);
  }

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state: { sortBy: resultsSortBy },
  } = useTable(...useTableProps);

  if (useSorting) {
    useEffect(() => {
      if (resultsSortBy && resultsSortBy.length) {
        onChangeSort(resultsSortBy[0].id, resultsSortBy[0].desc ? DESC : ASC);
      }
    }, [onChangeSort, resultsSortBy]);
  }

  const generateTHead = () => (
    <thead>
      <tr {...headerGroups[0].getHeaderGroupProps([{ className: classNames.headerGroup, key: JSON.stringify(data) }])}>
        {headerGroups[0].headers.map((column, idx) => ([
          <th
            {...column.getHeaderProps([
              determineAttributesProp(column),
              { className: classNames.header },
              (sortingColumns && sortingColumns.includes(column.id)
                ? column.getSortByToggleProps({ title: undefined })
                : {}
              ),
            ])}
            id={column.id}
            key={column.id}
            {...(
              onColumnReorder && !['actions', 'select'].includes(column.id) ? {
                draggable: true,
                onDragStart: handleDragStart,
                onDragOver: handleDragOver,
                onDrop: handleOnDrop,
                onDragEnter: handleDragEnter,
                ...(column.id === dragOver ? { dragover: 'true' } : {}),
              } : {}
            )}
          >
            {column.render('Header')}
          </th>,
          ...(columnResizable && headerGroups[0].headers.length - 2 > idx ? [<ColumnResizer key={`colres${column.id}`} className="columnResizer" />] : []),
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
        key={cell.column.id}
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
      ...(columnResizable && row.cells.length - 2 > idx ? [<ColumnResizer key={`colresk${cell.column.id}`} className="colForResize" />] : []),
    ]));

    const { original: rowData } = row;

    const rowProps = row.getRowProps([
      { className: classNames.row },
      (isFunction(rowAttributes) ? rowAttributes(rowData) : rowAttributes),
    ]);
    
    return rowReordering ? (
      <DDTable.Tr {...rowProps} rowData={rowData}>{cells}</DDTable.Tr>
    ) : (
      <tr {...rowProps}>{cells}</tr>
    );
  };

  const addRowSelectContext = node => (
    onRowSelect ? (
      <TableBulkSelectContext.Provider
        value={{
          selectedRows: new Set(selectedRowIds),
          onSelectAll: onRowSelectAll,
          onSelectNone: onRowSelectNone,
          onToggleItem: onRowToggleItem,
          rowAccessor: rowSelectAccessor,
        }}
      >
        {node}
      </TableBulkSelectContext.Provider>
    ) : node
  );

  const addDragDrop = node => (
    rowReordering ? (
      <DDTable
        onDrop={rowReordering.onDrop}
        PreviewRenderer={rowReordering.previewRender}
      >
        {node}
      </DDTable>
    ) : node
  );

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

  return addDragDrop(addRowSelectContext(tableElement));
};

const CellPropType = PropTypes.oneOfType([
  PropTypes.element,
  PropTypes.string,
  PropTypes.func,
]);

const AttributePropType = PropTypes.oneOfType([
  PropTypes.shape({}),
  PropTypes.func,
]);

const ColumnPropType = PropTypes.shape({
  Header: CellPropType,
  accessor: PropTypes.string,
  Cell: CellPropType,
  attributes: AttributePropType,
  cellAttributes: AttributePropType,
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
  rowAttributes: AttributePropType,
  rowReordering: PropTypes.shape({
    onDrop: PropTypes.func.isRequired,
    previewRender: PropTypes.func.isRequired,
    dragHandleClassname: PropTypes.string,
  }),
  onRowSelect: PropTypes.func,
  rowSelectAccessor: PropTypes.string,
  selectedRows: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ])),
  useSorting: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  onChangeSort: PropTypes.func,
  sortBy: PropTypes.shape({
    id: PropTypes.string,
    direction: PropTypes.oneOf([ASC, DESC]),
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
  rowAttributes: {},
  onColumnReorder: null,
  rowReordering: null,
  onRowSelect: null,
  rowSelectAccessor: 'id',
  selectedRows: [],
  useSorting: false,
  sortBy: null,
  onChangeSort: () => {},
};

export default DataTable;
