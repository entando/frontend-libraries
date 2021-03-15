import React, { Fragment } from 'react';
import { isNull, get } from 'lodash';
import PropTypes from 'prop-types';

import TableBulkSelectContext from 'TableBulkSelectContext';

const SelectCell = ({ row }) => {
  const selectAllMode = isNull(row);
  return (
    <TableBulkSelectContext.Consumer>
      {({ onSelectAll, onSelectNone, rowAccessor, selectedRows, onToggleItem }) => {
        const handleChange = ({ target: { checked } }) => {
          if (!selectAllMode) {
            onToggleItem(row);
            return;
          }
          if (checked) {
            onSelectAll();
          } else {
            onSelectNone();
          }
        };

        const rowKey = get(row, rowAccessor, 'All');

        const checkAttribute = !selectAllMode ? { checked: selectedRows.has(rowKey) } : {};

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
