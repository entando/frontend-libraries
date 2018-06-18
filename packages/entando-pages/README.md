# pages

Pages is a collection of react components used in Entando projects.

## Installation instructions

run `npm i @entando/pages`

---

## Components

Every component is imported in the following manner:

```js
import { <component> } from '@entando/pages'
```

The module also has its own css that can be loaded into a react application with a simple import:

```js
import '@entando/pages/dist/css/index.css';
```

### LoginForm

This component is used to render the login form.

The component expects the following props:

```js
{
  performLogin: PropTypes.func.isRequired,
  setLanguage: PropTypes.func.isRequired,
  loginErrorMessage: PropTypes.string, // defaults to empty string
  currentLanguage: PropTypes.string, // defaults to "en"
}
```

the `performLogin` function will receive two arguments:
- username <string>
- password <string>

the `setLanguage` function will receive one argument:
- language <string>

### LoginPage

Renders the login page and just accepts any children. It is common to pass the `LoginForm` as a child component.

### NotFoundPage

Renders the 404 page.

The component expects the following props:

```js
{
  gotoHome: PropTypes.func, // defaults to null
}
```

if the `gotoHome` function is passed the page will render a button that will call the given function when the user clicks on it.

---

## locales

This package also exports locales for the labels used within it.

To add these labels to an existing project merge them with the project labels:

```js
import { locales } from '@entando/pages';

// enLocale and itLocale are the project own locales.

enLocale.messages = { ...enLocale.messages, ...locales.en.messages };
itLocale.messages = { ...itLocale.messages, ...locales.it.messages };
```
