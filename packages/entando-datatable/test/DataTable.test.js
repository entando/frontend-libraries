import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import DataTable from 'DataTable';

const columns = [
  {
    Header: 'Name',
    cellAttributes: {
      className: 'tname',
    },
    accessor: 'name',
  },
  {
    Header: 'Code',
    attributes: {
      style: { width: "10%" },
    },
    accessor: 'code',
  },
];

const data = [
  { name: 'John', code: 'johndoe' },
  { name: 'Wally', code: 'flash' },
];

const rowAction = {
  Header: 'action',
  Cell: ({ original }) => `Open ${original.name}`,
};

const tableprops = {
  columns,
  data,
  rowAction,
  columnResizable: true,
  classNames: {
    table: 'metable',
    row: 'metablerow',
    cell: 'metablecell',
  },
};

describe('DataTable', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    const { getByText, queryByText } = render(<DataTable {...tableprops}  />);
    expect(getByText('action')).toBeInTheDocument();
    expect(getByText('Open John')).toBeInTheDocument();
    expect(getByText('Wally')).toBeInTheDocument();
    expect(queryByText('Barry')).not.toBeInTheDocument();
  });
});