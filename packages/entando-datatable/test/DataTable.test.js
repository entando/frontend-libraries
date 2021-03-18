import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent, screen, createEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

const onColumnReorder = jest.fn();
const onRowSelect = jest.fn();

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
  onRowSelect,
  onColumnReorder,
  rowSelectAccessor: 'code',
};

describe('DataTable', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing (just check if action column is there)', () => {
    render(<DataTable {...tableprops}  />);
    expect(screen.getByText('action')).toBeInTheDocument();
  });

  it('check if most data are present in DataTable', () => {
    render(<DataTable {...tableprops}  />);
    expect(screen.getByText('Open John')).toBeInTheDocument();
    expect(screen.getByText('Wally')).toBeInTheDocument();
    expect(screen.queryByText('Barry')).not.toBeInTheDocument();
  });

  it('check classnames', () => {
    render(<DataTable {...tableprops}  />);
    const theTable = screen.getByText('John').closest('table');
    expect(theTable.classList.contains('metable')).toBeTruthy();
    
    const theRow = screen.getByText('Wally').closest('tr');
    expect(theRow.classList.contains('metablerow')).toBeTruthy();

    const theCell = screen.getByText('flash').closest('td');
    expect(theCell.classList.contains('metablecell')).toBeTruthy();
  });

  it('check an action button if it is the correct action element', () => {
    render(<DataTable {...tableprops}  />);
    const openWallyBtn = screen.getByText('Open Wally').closest('a');
    expect(openWallyBtn).toBeInTheDocument();
    expect(openWallyBtn).toHaveAttribute('href', '/open?code=flash');

    const openJohnBtn = screen.getByText('Open John').closest('a');
    expect(openJohnBtn).toBeInTheDocument();
    expect(openJohnBtn).toHaveAttribute('href', '/open?code=johndoe');
  });

  it ('check row selection with select all', () => {
    render(<DataTable {...tableprops}  />);
    const selectAllElement = screen.getByText('Select All');
    expect(selectAllElement).toBeInTheDocument();
    userEvent.click(selectAllElement);
    expect(onRowSelect).toHaveBeenCalledWith(data.map(({ code }) => code));
    userEvent.click(selectAllElement);
    expect(onRowSelect).toHaveBeenCalledWith([]);
  });

  it ('check row selection with selecting first item', () => {
    render(<DataTable {...tableprops}  />);
    const rowSelectElement = screen.getByText(`Select row ${data[0]['code']}`);
    expect(rowSelectElement).toBeInTheDocument();
    userEvent.click(rowSelectElement);
    expect(onRowSelect).toHaveBeenCalledWith([data[0].code]);
  });

  it ('column reordering feature', () => {
    render(<DataTable {...tableprops}  />);
    const nameHeader = screen.getByText('Name');
    const codeHeader = screen.getByText('Code');

    const dataTransferValues = { boo: 1 };

    const dataTransfer = {
      setData: (key, value) => {
        dataTransferValues[key] = value;
      },
      getData: key => dataTransferValues[key],
    }

    const dragStartEvent = createEvent.dragStart(nameHeader);
    Object.assign(dragStartEvent, { dataTransfer });

    const dropEvent = createEvent.drop(codeHeader);
    Object.assign(dropEvent, { dataTransfer });

    fireEvent(nameHeader, dragStartEvent);
    fireEvent.dragOver(codeHeader);
    fireEvent(codeHeader, dropEvent);
    expect(onColumnReorder).toHaveBeenCalledWith(['code', 'name']);
  });
});