# Entando Microfrontend Communication Library

A powerful and lightweight JavaScript library that facilitates seamless communication between microfrontends through a centralized event-based communication mechanism.

[![npm version](https://img.shields.io/npm/v/microfrontend-mediator.svg?style=flat)](https://www.npmjs.com/entando/entando-mfecommunication)
[![Build Status](https://travis-ci.org/yourusername/microfrontend-mediator.svg?branch=master)](https://travis-ci.org/entando/entando-mfecommunication)

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API](#api)
    - [subscribe](#subscribe)
    - [unsubscribe](#unsubscribe)
    - [unsubscribeAllEventsOfSubscriber](#unsubscribeAllEventsOfSubscriber)
    - [unsubscribeAllSubscribersOfEvent](#unsubscribeAllSubscribersOfEvent)
    - [unsubscribeAll](#unsubscribeAll)
    - [publish](#publish)
    - [publishToSubscriber](#publishToSubscriber)
    - [publishExceptToSubscriber](#publishExceptToSubscriber)
    - [listSubscribers](#listSubscribers)
    - [listSubscribersForEvent](#listSubscribersForEvent)
    - [listEvents](#listEvents)
    - [listEventsForSubscriber](#listEventsForSubscriber)

## Installation

Install `@entando/mfecommunication` via npm:

```sh
npm install @entando/mfecommunication --save
```

## Usage

The `@entando/mfecommunication` mediator is a singleton and should be used to facilitate communication between different microfrontends on the same page. Always remember to unsubscribe when you're done to avoid any memory leaks.  `@entando/mfecommunication` mediator can be used in all JS libraries, frameworks and environments.

There are 3 different ways to use the `@entando/mfecommunication` mediator functionality.

1. Here is an example of how to use the mediator by importing the instance from the library:

```javascript
import { mediatorInstance } from '@entando/mfecommunication';
```

2. `entando-mfecommunication` library exposes the `mediatorInstance` to the window object. As soon as you import the `@entando/mfecommunication` build file into html, then `window.entando.globals.mediator` will be available for any JS code.
Here is an example:
```html
    <!-- Include the bundled script -->
    <script src="https://unpkg.com/@entando/mfecommunication/dist/entando-mfecommunication.umd.cjs"></script>

    <script>
        // The library is available as a global variable
        var mediator = window.entando.globals.mediator;

        // Example usage:
        mediator.subscribe("eventName", {
            callerId: "subscriberA",
            callback: (data) => console.log('Subscriber A received:', data),
        });

        mediator.publish("eventName", {message: "Hello World!"});
    </script>
```

3. Since using singleton pattern might not be suitable for all the usecases `@entando/mfecommunication` exports the `Mediator` class itself and the developer can create instance of it whenever and however they seem to be appropriate. This is how it can be used:
```javascript
import { Mediator } from '@entando/mfecommunication';

const myMediatorInstance = new Mediator();
```

Once you have an access to the `mediatorInstance` here are simple examples how it can be used:

```javascript
// Subscriber A
mediatorInstance.subscribe("eventName", {
  callerId: "subscriberA",
  callback: (data) => console.log('Subscriber A received:', data),
});

// Subscriber B
mediatorInstance.subscribe("eventName", {
  callerId: "subscriberB",
  callback: (data) => console.log('Subscriber B received:', data),
});

// Publisher
mediatorInstance.publish("eventName", {message: "Hello World!"});
```

## API

### Types

#### `Callback`

A type alias for a function that takes an optional `data` parameter of an unknown type and does not return anything.

```typescript
type Callback = (data?: unknown) => void;
```

#### `EventCallback`

An interface for the callback object required for subscribing to an event. It contains a `callerId` of type string, and a `callback` of type `Callback`.

```typescript
interface EventCallback {
  callerId: string;
  callback: Callback;
}
```

#### `MediatorType`

A type alias for the instance of the Mediator class. 

```typescript
type MediatorType = typeof mediatorInstance;
```

### Methods

#### `subscribe(eventType: string, eventCallback: EventCallback): void`

Subscribes to a specific event. It requires an event type and an event callback object which includes a `callerId` and a `callback` function.

#### `unsubscribe(eventType: string, callerId: string): void`

Unsubscribes a specific subscriber from a specific event type.

#### `unsubscribeAllEventsOfSubscriber(callerId: string): void`

Unsubscribes a specific subscriber from all event types.

#### `unsubscribeAllSubscribersOfEvent(eventType: string): void`

Unsubscribes all subscribers from a specific event type.

#### `unsubscribeAll(): void`

Unsubscribes all subscribers from all event types.

#### `publish(eventType: string, data?: unknown): void`

Publishes an event of a specific type with optional data. All subscribers of this event type will receive the data.

#### `publishToSubscribers(eventType: string, callerIds: string[], data?: unknown): void`

Publishes an event of a specific type with optional data to a specific subscribers.

#### `publishExceptToSubscribers(eventType: string, callerIds: string[], data?: unknown): void`

Publishes an event of a specific type with optional data to all subscribers except for the specified ones.

#### `listSubscribers(): Array<{eventType: string, subscriber: string}>`

Lists all subscribers for all events.

#### `listSubscribersForEvent(eventType: string): string[]`

Lists all subscribers for a specific event.

#### `listEvents(): string[]`

Lists all event types.

#### `listEventsForSubscriber(subscriber: string): string[]`

Lists all event types a specific subscriber is subscribed to.
