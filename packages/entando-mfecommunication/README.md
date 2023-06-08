# Brief Explanation on MFE communication

`Mediator.ts` file defines a Mediator class that allows objects to communicate with each other without having direct references to each other. It provides methods to `subscribe` to and `unsubscribe` from `events`, and to trigger events. The Mediator class maintains a list of `subscribers` for each event type, and when an event is triggered, it calls the `callbacks` of all the subscribers for that event type.

## Installation instructions

run `npm i @entando/messages`

Inside your main reducer add the `messages` reducer:

```ts
Yeah()
```

And other TS code:

```ts
yeah
```
---

## Methods

The `errors` slorem

### Method 1 

`addErrors` expects an array of errors that will be set.

---

## Other

The `toasts` state exports actions, selectors and a list of constants representing the toast types.

### Other1(message, type)

`addToast` needs a message string and a type. It is highly recommend to use the types exported by the package, although it is possible to use custom ones.

