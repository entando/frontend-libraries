# ddtable

DDTable is a drag and drop table powered by `react-dnd` used in Entando projects.

## Installation instructions

run `npm i @entando/ddtable`

---

## Components

Every component is imported in the following manner:

```js
import { <component> } from '@entando/ddtable'
```

The module also has its own css that can be loaded into a react application with a simple import:

```js
import '@entando/ddtable/dist/css/index.css';
```

### DDTable

This component is used to render the table itself.

The component expects the following props:

```js
{
  onDrop: PropTypes.func,
  PreviewRenderer: PropTypes.func,
  children: PropTypes.node.isRequired,
}
```

the `onDrop` function will be fired when the drop event is triggered.

the `PreviewRenderer` is the component used to render the preview of the drag and drop action.

`children` is meant to be the table itself contained within the `DDTable` component.

Every single row that is meant to be draggable in the table should be an instance of `DDTable.Tr` and should contain an instance of the `DDTable.Handle` component.

### DDTable.Tr

Renders the actual row of the table and it expects the given properties:

```js
{
  children: PropTypes.node.isRequired,
  rowData: PropTypes.shape({}).isRequired,
}
```

`children` is meant to be a collection of **td** elements.
`rowData` rapresents the actual object that is going to be passed around on the `onDrop` callback.

### DDTable.Handle

This component is wrapping any other element that is going to be used to trigger the dragging.
