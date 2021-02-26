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
  Cell: ({ original }) => <a href={`/open?code=${original.code}`}>Open {original.name}</a>,
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

  it('check classnames', () => {
    const { getByText } = render(<DataTable {...tableprops}  />);
    const theTable = getByText('John').closest('table');
    expect(theTable.classList.contains('metable')).toBeTruthy();
    
    const theRow = getByText('Wally').closest('tr');
    expect(theRow.classList.contains('metablerow')).toBeTruthy();

    const theCell = getByText('flash').closest('td');
    expect(theCell.classList.contains('metablecell')).toBeTruthy();
  });

  it('check an action button if it is the correct action element', () => {
    const { getByText } = render(<DataTable {...tableprops}  />);
    const openWallyBtn = getByText('Open Wally').closest('a');
    expect(openWallyBtn).toBeInTheDocument();
    expect(openWallyBtn).toHaveAttribute('href', '/open?code=flash');

    const openJohnBtn = getByText('Open John').closest('a');
    expect(openJohnBtn).toBeInTheDocument();
    expect(openJohnBtn).toHaveAttribute('href', '/open?code=johndoe');
  });
});