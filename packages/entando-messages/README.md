# messages

Redux states used to manage messages

## Installation instructions

run `npm i @entando/messages`

Inside your main reducer add the `messages` reducer:

```js
import { combineReducers } from 'redux';
import { messages } from '@entando/messages';

export default combineReducers({
  messages,
});
```

The resulting state will be:

```js
{
  messages: {
    errors: [],
    toasts: {},
  }
}
```
---

## Errors

The `errors` state only exposes basic actions and selectors

### addErrors(errors)

`addErrors` expects an array of errors that will be set.

### clearErrors()

`clearErrors` removes all the errors currently stored in the state.

### getErrors(state)

The `getErrors` selector returns the full array of currently stored errors.

---

## Toasts

The `toasts` state exports actions, selectors and a list of constants representing the toast types.

### addToast(message, type)

`addToast` needs a message string and a type. It is highly recommend to use the types exported by the package, although it is possible to use custom ones.

### removeToast(id)

`removeToast` removes from the state any toast with the matching ID. whenever a toast is added to the state a unique ID is assigned to it.

### getToasts(state)

The `getToasts` selector returns the object containing all the existing toasts, with each message assigned to a unique ID.

```js
{
  'f64f2940-fae4-11e7-8c5f-ef356f279131': {
    message: 'toast message',
    type: TOAST_ERROR,
  },
}
```

### Types

The given types constants are exported by this package:

- TOAST_INFO
- TOAST_WARNING
- TOAST_ERROR
- TOAST_SUCCESS
