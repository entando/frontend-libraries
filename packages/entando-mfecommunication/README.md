# Brief Explanation on MFE communication

`Mediator.ts` file defines a Mediator class that allows objects to communicate with each other without having direct references to each other. It provides methods to `subscribe` to and `unsubscribe` from `events`, and to trigger events. The Mediator class maintains a list of `subscribers` for each event type, and when an event is triggered, it calls the `callbacks` of all the subscribers for that event type.

## Installation instructions

run `yeah`

Inside your yeah `yeah` yeah:

```ts
Yeah()
```

And other TS code:

```ts
yeah
```
---

## List of Methods implemented

The `errors` slorem

### subscribe(eventType,eventCallback) 

`subscribe` method needs to have a eventType and eventCallback type. It first verifies that eventType is a valid string and that eventCallback is a valid event callback object. At the end eventCallback is added to the array of callbacks for the specified eventType

### unsubscribe(eventType,callerId) 

`unsubscribe` method unsubscribe from an event.
  The purpose of this function is to allow a caller to unsubscribe
  from an event by providing the eventType and their callerId. 
  This ensures that the caller will no longer receive any callbacks for that event.

  ### unsubscribeAllEventsOfSubscriber(callerId) 

`unsubscribeAllEventsOfSubscriber` method function takes a callerId string parameter and loops through each event in the events object. Checking callerId ensures that the caller will no longer receive any callbacks for any event they subscribed to.

  ### unsubscribeAllSubscribersOfEvent(eventType) 

`unsubscribeAllSubscribersOfEvent` method function takes a eventType string parameter. If the eventType exists in the events object it sets the value as an empty array, removing subscribers from the event.

  ### unsubscribeAll() 

`unsubscribeAll` method is used to unsubscribe all subscribers from all events. It loops through each event in the this.events object and sets the array as empty, removing all subscribers from all events.

  ### publish(eventType,data) 

`publish` method needs an eventType string and an data (optional) parameter.It is used to determine which subscribers can receive the data.

  ### publishToSubscriber(eventType,callerId,data) 

`publishToSubscriber` method needs an eventType string, callerId string and an data (optional) parameter.It allows the caller to specify which subscriber should receive data, and only that subscriber will receive it

  ### publishExceptToSubscriber(eventType,callerId,data) 

`publishExceptToSubscriber` method similarly to `publishToSubscriber` method needs an eventType string, callerId string and an data (optional) parameter. Contrary to what happens with `publishToSubscriber` method it publishes data to all subscribers except the one with the specified callerId

  ### listSubscribers() 

`listSubscribers` method returns an array of objetcs with eventType and subscriber both string type. ON every callback it creates an array with those 2 objects and it pushes to the subscribres array.

  ### listSubscribersForEvent(eventType) 

`listSubscribersForEvent` method accept an eventType of type string and returns an array of strings representing the subscribers for that event once evenType is been checked and the callerId property is pushed to the subscribers array. 

  ### listEvents() 

`listEvents` method returns an array of all registered event types.It iterates on every event on this.events and then it pushes those into the events array, returning
the avents array.

  ### listEventsForSubscriber(subscriber) 

`listEventsForSubscriber` method It takes subscriber string type and 
  returns an array of strings (events) of all the event types that the subscriber is subscribed to only if the callerId property of the callback matches the subscriber itself.

---


