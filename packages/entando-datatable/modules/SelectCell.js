import React, { Fragment } from 'react';
import { isNull, get } from 'lodash';
import PropTypes from 'prop-types';

import TableBulkSelectContext from 'TableBulkSelectContext';

const SelectCell = ({ row }) => {
  const selectAllMode = isNull(row);
  return (
    <TableBulkSelectContext.Consumer>
      {({ 
        onSelectAll, onSelectNone, rowAccessor, selectedRows,
        onToggleItem, allSelected, onSetAllSelected,
      }) => {
        const rowKey = get(row, rowAccessor, 'All');
        const handleChange = ({ currentTarget: { checked } }) => {
          if (!selectAllMode) {
            onToggleItem(row);
          } else {
            onSetAllSelected(checked);
            if (checked) {
              onSelectAll();
            } else {
              onSelectNone();
            }
          }
        };

        const checkAttribute = { checked: (!selectAllMode ? selectedRows.has(rowKey) : allSelected) };

        return (
          <Fragment>
            <label
              htmlFor={`select${rowKey}`}
              className="control-label SelectCell__label"
            >
              {rowKey === 'All' ? 'Select All' : `Select row ${rowKey}`}
            </label>
            <input
              type="checkbox"
              id={`select${rowKey}`}
              onChange={handleChange}
              {...checkAttribute}
            />
          </Fragment>
        );
      }}
    </TableBulkSelectContext.Consumer>
  );
};

SelectCell.propTypes = {
  row: PropTypes.shape({}),
};

SelectCell.defaultProps = {
  row: null,
};

export default SelectCell;
