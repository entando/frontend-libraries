console.log('Debug: Mediator.ts file loaded');
// Define the Callback type
export type Callback = (data?: unknown) => void;
// Define the EventCallback interface
export interface EventCallback {
  callerId: string;
  callback: Callback;
} 
// Define the Mediator class
export class Mediator {
  private events: Record<string, EventCallback[]>;

  constructor() {
    // Initialize the events object
    this.events = {};
  }
  // Verify that a string is valid or throw an error
  private verifyString(name: string, str: string): void {
    if (typeof str !== 'string') {
      throw new Error(`${name} must be a string`);
    }
  }
  // Verify that a callback is valid or throw an error
  private verifyCallback(name: string, callback: Callback): void {
    if (typeof callback !== 'function' || !callback) {
      throw new Error(`${name} must be a function`);
    }
  }
 // Verify that an event callback is valid
  private verifyEventCallback(eventCallback: EventCallback): void {
    if (typeof eventCallback !== 'object' || !eventCallback) {
      throw new Error('eventCallback must be an object with callerId and callback properties');
    }
    this.verifyString('eventCallback.callerId', eventCallback.callerId);
    this.verifyCallback('eventCallback.callback', eventCallback.callback);
  }
  // Subscribe to an event
  subscribe(eventType: string, eventCallback: EventCallback): void {
    this.verifyString('eventType', eventType);
    this.verifyEventCallback(eventCallback);

    if (!this.events[eventType]) {
      // if it does not exist, is set as an empty array
      this.events[eventType] = [];
    }
    // eventCallback added to this.events[eventType]
    this.events[eventType].push(eventCallback);
  }
  // Unsubscribe from an event.
  // The purpose of this function is to allow a caller to unsubscribe
  // from an event by providing the eventType and their callerId. 
  // This ensures that the caller will no longer receive any callbacks for that event.
  unsubscribe(eventType: string, callerId: string): void {
    this.verifyString('eventType', eventType);
    this.verifyString('callerId', callerId);
    if (this.events[eventType]) {
      this.events[eventType] = this.events[eventType].filter(cb => cb.callerId !== callerId);
    }
  }

  unsubscribeAllEventsOfSubscriber(callerId: string): void {
    this.verifyString('callerId', callerId);
    for (const event in this.events) {
      // used to loop through each callback in the array and check if the callerId matches the provided callerId
      this.events[event] = this.events[event].filter(cb => cb.callerId !== callerId);
    }
  }
  //unsubscribe all subscribers from a specific event.
  unsubscribeAllSubscribersOfEvent(eventType: string): void {
    this.verifyString('eventType', eventType);
    if (this.events[eventType]) {
      this.events[eventType] = [];
    }
  }
  //unsubscribe all subscribers from all events.
  unsubscribeAll(): void {
    for (const event in this.events) {
      this.events[event] = [];
    }
  }
  //define publish method
  publish(eventType: string, data?: unknown): void {
    this.verifyString('eventType', eventType);
    if (this.events[eventType]) {
      //loops through each callback in the array and invokes the callback function with the data parameter
      this.events[eventType].forEach(cb => cb.callback(data));
    }
  }
  // Publish data to a specific subscriber. 
  // It allows the caller to specify which subscriber should receive the data,
  // and only that subscriber will receive it.
  publishToSubscriber(eventType: string, callerId: string, data?: unknown): void {
    this.verifyString('eventType', eventType);
    this.verifyString('callerId', callerId);
    if (this.events[eventType]) {
      // if eventType loops through each callback in the array 
      // and invokes the callback function with the data parameter...
      this.events[eventType].forEach(cb => {
        // ...if the callerId of the callback matches the callerId
        if (cb.callerId === callerId) {
          cb.callback(data);
        }
      });
    }
  }
  // Same as above except for the one that doesn't match callerId  
  publishExceptToSubscriber(eventType: string, callerId: string, data?: unknown): void {
    this.verifyString('eventType', eventType);
    this.verifyString('callerId', callerId);
    if (this.events[eventType]) {
      this.events[eventType].forEach(cb => {
        if (cb.callerId !== callerId) {
          cb.callback(data);
        }
      });
    }
  }
  // The listSubscribers method returns an array of objects containing the event type and subscriber ID
  //  for each registered callback
  listSubscribers(): Array<{eventType: string, subscriber: string}> {
    // var subscribers array of string objects
    const subscribers: Array<{eventType: string, subscriber: string}> = [];
    for (const event in this.events) {
      this.events[event].forEach(cb => subscribers.push({eventType: event, subscriber: cb.callerId}));
    }
    return subscribers;
  }
  // It takes in an eventType parameter of type string
  // and returns subscribers an array of strings
  listSubscribersForEvent(eventType: string): string[] {
    const subscribers: string[] = [];
    if (this.events[eventType]) {
      this.events[eventType].forEach(cb => subscribers.push(cb.callerId));
    }
    return subscribers;
  }
  // It returns an array of all registered event types
  listEvents(): string[] {
    const events: string[] = [];
    for (const event in this.events) {
      events.push(event);
    }
    return events;
  }
  // It takes subscriber and 
  // returns an array of strings of all the event types that the subscriber is subscribed to ...
  listEventsForSubscriber(subscriber: string): string[] {
    const events: string[] = [];
    for (const event in this.events) {
      this.events[event].forEach(cb => {
        // ... If the callerId property of the callback matches the subscriber
        if (cb.callerId === subscriber) {
          events.push(event);
        }
      });
    }
    return events;
  }
}

// BEWARE, this is a singleton, so it will be shared across all mfe, ALWAYS clean up with unsubscribe when done
export const mediatorInstance = new Mediator();
export type MediatorType = typeof mediatorInstance;

// export default mediatorInstance to window for every mfe to access
if (typeof window === 'undefined') {
  console.warn('window is undefined, cannot export mediatorInstance');
} else {
  window.entando = window.entando || {};
  window.entando.globals = window.entando.globals || {};
  window.entando.globals.mediator = window.entando.globals.mediator || mediatorInstance;
}