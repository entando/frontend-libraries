# datatable

DataTable is a customizable data table powered by [`react-table`](https://react-table.tanstack.com/docs/overview) used in Entando projects specifically in Appbuilder & CMS.

This component adds features on making columns resizable and reorderable (except `actions` column)
## Installation instructions

run `npm i @entando/datatable`

---

## Components

Every component is imported in the following manner:

```js
import { <component> } from '@entando/datatable'
```

The module also has its own css that can be loaded into a react application with a simple import:

```js
import '@entando/datatable/dist/css/index.css';

### DataTable

This component is used to render the data table component.

The component expects the following props:

```js
{
  columns: Array(<ColumnPropType>),
  data: Array(<any>),
  rowAction: <ColumnPropType>,
  columnResizable: true|false,
  classNames: {
    table: <classname_string>,
    headerGroup: <classname_string>,
    header: <classname_string|function>,
    row: <classname_string|function>,
    cell: <classname_string|function>,
  }),
  onColumnReorder: <function>,
  rowAttributes: <attribute_object|function>,
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

 `data` - same as `react-table` describes: the contents of your table. See [`useTable`](https://react-table.tanstack.com/docs/api/useTable) for details

 `rowAction` - a column definition that holds the row actions that is to be placed at the rightmost of the row. It is a must to describe the `Header` label and `Cell` JSX of the action column.

 `columnResizable` (boolean) - this is to make the columns resizable except for the action column if given.

 `onColumnReorder` (function) - this event is called when user reorders the column - this only passed an array of column ids (or accessors). If unspecified, user cannot reorder the columns.

 `rowAttributes` (object|JSX func) - HTML element attributes for you to place per row. If function is given, then it will pass its corresponding row object.

 `rowReordering` - set of properties that are required properties for [`DDTable`](https://github.com/entando/frontend-libraries/tree/master/packages/entando-ddtable) component. This will activate row reordering feature.

 `classNames` - set of `className` strings to be used per part of the table such as `<table>`, `<thead>`, `<th>`, `<tr>`, and `<td>`.

---
 ## Upcoming feature notes
  - Soon, this will be implemented with row selecting feature