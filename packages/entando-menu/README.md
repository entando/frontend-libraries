# menu

Menu is a collection of react components used in Entando projects.

## Installation instructions

run `npm i @entando/menu`

---

## Components

Every component is imported in the following manner:

```js
import { <component> } from '@entando/menu'
```

The module also has its own css that can be loaded into a react application with a simple import:

```js
import '@entando/menu/dist/css/index.css';
```

---

## locales

This package also exports locales for the labels used within it.

To add these labels to an existing project merge them with the project labels:

```js
import { locales } from '@entando/menu';

// enLocale and itLocale are the project own locales.

enLocale.messages = { ...enLocale.messages, ...locales.en.messages };
itLocale.messages = { ...itLocale.messages, ...locales.it.messages };
```
