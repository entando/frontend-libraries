# datatable

DataTable is a customizable data table powered by [`react-table`](https://react-table.tanstack.com/docs/overview) used in Entando projects specifically in Appbuilder & CMS.

This component adds features on making columns resizable and reorderable (except `actions` column)
## Installation instructions

run `npm i @entando/datatable`

---

## Components

Every component is imported in the following manner:

```js
import { <component> } from '@entando/datatable';
```

The module also has its own css that can be loaded into a react application with a simple import:

```js
import '@entando/datatable/dist/css/index.css';
```
---
## `<DataTable>`

This component is used to render the data table component.

The component expects the following props:

```js
{
  columns: Array(<ColumnPropType>),
  data: Array(<any>),
  rowAction: <ColumnPropType>,
  columnResizable: <boolean>,
  classNames: {
    table: <classname_string>,
    headerGroup: <classname_string>,
    header: <classname_string|function>,
    row: <classname_string|function>,
    cell: <classname_string|function>,
  }),
  rowAttributes: <attribute_object|function>,
  onColumnReorder: <function>,
  onRowSelect: <function>,
  rowSelectAccessor: <string - default 'id'>,
  selectedRows: <array of row accessor values>,
  useSorting: <boolean true|array of column ids>,
  onChangeSort: <function>,
  sortBy: <object (id,direction)>,
  rowReordering: {
    onDrop: <function>,
    previewRender: <function|JSX>,
    dragHandleClassname: <string>,
  }),
  }
```

`columns` - array of objects that describes column information including how the cells in the column displays. Basically this is the same how you describe the column in [`useTable`](https://react-table.tanstack.com/docs/api/useTable) component. But it has additional attributes you can add:
 - `attributes` (Object) - you can add HTML element attributes on the header cell `<th>` e.g. `className`, event listeners e.g. `onClick`, etc.
 - `cellAttributes` (Object) - HTML element attributes for the data cell `<td>` that places the value of the accessor.
 - `cellHoc` - your HOC component that encloses the cell of the column

 `data` - same as `react-table` describes: the contents of your table. See [`useTable`](https://react-table.tanstack.com/docs/api/useTable) for details

 `rowAction` (optional) - a column definition that holds the row actions that is to be placed at the rightmost of the row. It is a must to describe the `Header` label and `Cell` JSX of the action column.

 `rowActionAlign` (bool - defaults to `ROW_ACTION_ALIGN.ALIGN_RIGHT`) - optionally, you can move the actions column to left side instead of right. Take note when moving the actions column to the left, the selection checkbox columns will be move to right side.

 `rowAttributes` (object|JSX func) - HTML element attributes for you to place per row. If function is given, then it will pass its corresponding row object.

 `classNames` - set of `className` strings to be used per part of the table such as `<table>`, `<thead>`, `<th>`, `<tr>`, and `<td>`.

---
## Extra options / properties in this component:

 **Column resizable option** - you can use the prop `columnResizable` (boolean) to make the columns resizable except for the action column if given.

 **Column Reordering option** - use the prop `onColumnReorder` (function) that is called when user reorders the column - this only passed an array of column ids (or accessors). If unspecified, column reordering is deactivated.

 **Row Data Bulk Selection** - this is one of the common features of a table that enables the user to select items shown on table. It will need two props - `rowSelectAccessor` (string) will be the basis of what unique prop of row data to be stated when selected. Best example is the prop `id`. Another 2nd required prop is `onRowSelect` (function) which will be invoked when there's an activity in user selection. It will only pass an array of id/prop value of selected row(s)' `rowSelectAccessor`. An optional prop is using `selectedRows` (array) which will preselect rows upon rendering.

 **Column Sorting option** - this will activate data sorting based on selected column. Indicating `useSorting` (boolean or array of strings) will activate the feature. Indicating the prop with `true` will activate sorting function on all given columns or you can specify an array of columns (accessor) to which columns will only have the sort option. Since this relies on remote sorting, this will invoke `onChangeSort` (function) prop whenever a user clicks on one of the sortable column. It will only pass an object consist of the column id (`id`) and `direction` which is either `TABLE_SORT_DIRECTION.ASC` or `TABLE_SORT_DIRECTION.DESC` depending on the state. You can also predefine sort properties by using `sortBy` (object) prop - must consist of both `id` and `direction`, same as param value passed from `onChangeSort`.

 **Row Reordering option** - an extra feature that you can take advantage when your table will involve modifying orders of you data. Use the prop `rowReordering` (object) and provide the props that are required for [`DDTable`](https://github.com/entando/frontend-libraries/tree/master/packages/entando-ddtable) component.

---
 ## Take note
  - Currently, this component cannot be used both row reordering (`rowReordering`) and column reordering (`onColumnReorder`) due to feature conflict regarding drag and drop. Fix will come on the next update.