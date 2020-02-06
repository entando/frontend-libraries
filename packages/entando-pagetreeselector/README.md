# PageTreeSelector

PageTreeSelector is a react js based component written purely via jsx used in Entando projects.

## Installation instructions

run `npm i @entando/pagetreeselector`

---

## Components

Every component is imported in the following manner:

```js
import { <component> } from '@entando/pagetreeselector'
```

The module also has its own css that can be loaded into a react application with a simple import:

```js
import '@entando/pagetreeselector/dist/css/index.css';
```

### PageTreeSelector

This component is used to render the table itself.

The component expects the following props:

```js
{
  pages: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    displayedInMenu: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    depth: PropTypes.number.isRequired,
    expanded: PropTypes.bool.isRequired,
    isEmpty: PropTypes.bool.isRequired,
  })),
  onExpandPage: PropTypes.func,
  onDidMount: PropTypes.func,
  onPageSelect: PropTypes.func,
}
```

the `pages` array is data about all the available pages injected into table

the `onExpandPage` function will be fired when the expand icon is clicked.

the `onDidMount` function will be called inside `componentDidMount` lifecycle function

the `onPageSelect` function will be fired when user clicks on a row (single page)
