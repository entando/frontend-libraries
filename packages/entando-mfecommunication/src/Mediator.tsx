console.log('inside Medaitor Class');

type Callback = (data?: unknown) => void;

interface EventCallback {
  callerId: string;
  callback: Callback;
} 

class Mediator {
  private events: Record<string, EventCallback[]>;

  constructor() {
    console.log('inside Medaitor constructor');
    this.events = {};
  }

  private verifyString(name: string, str: string): void {
    console.log('inside Medaitor verifyString', {str});
    if (typeof str !== 'string') {
      throw new Error(`${name} must be a string`);
    }
  }

  private verifyCallback(name: string, callback: Callback): void {
    console.log('inside Medaitor verifyCallback', {callback});
    if (typeof callback !== 'function') {
      throw new Error(`${name} must be a function`);
    }
  }

  private verifyEventCallback(eventCallback: EventCallback): void {
    console.log('inside Medaitor verifyEventCallback', {eventCallback});
    if (typeof eventCallback !== 'object' || !eventCallback.callerId || !eventCallback.callback) {
      throw new Error('eventCallback must be an object with callerId and callback properties');
    }
    this.verifyString('eventCallback.callerId', eventCallback.callerId);
    this.verifyCallback('eventCallback.callback', eventCallback.callback);
  }

  subscribe(eventType: string, eventCallback: EventCallback): void {
    console.log('inside Medaitor subscribe', {eventType, eventCallback});
    this.verifyString('eventType', eventType);
    this.verifyEventCallback(eventCallback);

    if (!this.events[eventType]) {
      this.events[eventType] = [];
    }
    this.events[eventType].push(eventCallback);
    console.log('this.events: ', this.events);
  }

  unsubscribe(eventType: string, callerId: string): void {
    console.log('inside Medaitor unsubscribe', {eventType, callerId});
    this.verifyString('eventType', eventType);
    this.verifyString('callerId', callerId);
    if (this.events[eventType]) {
      this.events[eventType] = this.events[eventType].filter(cb => cb.callerId !== callerId);
    }
    console.log('this.events: ', this.events);
  }

  unsubscribeAllEventsOfSubscriber(callerId: string): void {
    console.log('inside Medaitor unsubscribeAll', {callerId});
    this.verifyString('callerId', callerId);
    for (const event in this.events) {
      this.events[event] = this.events[event].filter(cb => cb.callerId !== callerId);
    }
    console.log('this.events: ', this.events);
  }

  unsubscribeAllSubscribersOfEvent(eventType: string): void {
    console.log('inside Medaitor unsubscribeAll', {eventType});
    this.verifyString('eventType', eventType);
    if (this.events[eventType]) {
      this.events[eventType] = [];
    }
    console.log('this.events: ', this.events);
  }

  unsubscribeAll(): void {
    console.log('inside Medaitor unsubscribeAll');
    for (const event in this.events) {
      this.events[event] = [];
    }
    console.log('this.events: ', this.events);
  }

  publish(eventType: string, data?: unknown): void {
    console.log('inside Medaitor publish', {eventType, data});
    this.verifyString('eventType', eventType);
    if (this.events[eventType]) {
      this.events[eventType].forEach(cb => cb.callback(data));
    }
    console.log('this.events: ', this.events);
  }

  publishToSubscriber(eventType: string, callerId: string, data?: unknown): void {
    console.log('inside Medaitor publishEventToSubscriber', {eventType, callerId, data});
    this.verifyString('eventType', eventType);
    this.verifyString('callerId', callerId);
    if (this.events[eventType]) {
      this.events[eventType].forEach(cb => {
        if (cb.callerId === callerId) {
          cb.callback(data);
        }
      });
    }
    console.log('this.events: ', this.events);
  }

  publishExceptToSubscriber(eventType: string, callerId: string, data?: unknown): void {
    console.log('inside Medaitor publishExceptToSubscriber', {eventType, callerId, data});
    this.verifyString('eventType', eventType);
    this.verifyString('callerId', callerId);
    if (this.events[eventType]) {
      this.events[eventType].forEach(cb => {
        if (cb.callerId !== callerId) {
          cb.callback(data);
        }
      });
    }
    console.log('this.events: ', this.events);
  }

  listSubscribers(): Array<{eventType: string, subscriber: string}> {
    console.log('inside Medaitor listSubscribers');
    const subscribers: Array<{eventType: string, subscriber: string}> = [];
    for (const event in this.events) {
      this.events[event].forEach(cb => subscribers.push({eventType: event, subscriber: cb.callerId}));
    }
    console.log('subscribers: ', subscribers);
    return subscribers;
  }

  listSubscribersForEvent(eventType: string): string[] {
    console.log('inside Medaitor listSubscribersForEvent', {eventType});
    const subscribers: string[] = [];
    if (this.events[eventType]) {
      this.events[eventType].forEach(cb => subscribers.push(cb.callerId));
    }
    console.log('subscribers: ', subscribers);
    return subscribers;
  }

  listEvents(): string[] {
    console.log('inside Medaitor listEvents');
    const events: string[] = [];
    for (const event in this.events) {
      events.push(event);
    }
    console.log('events: ', events);
    return events;
  }

  listEventsForSubscriber(subscriber: string): string[] {
    console.log('inside Medaitor listEventsForSubscriber', {subscriber});
    const events: string[] = [];
    for (const event in this.events) {
      this.events[event].forEach(cb => {
        if (cb.callerId === subscriber) {
          events.push(event);
        }
      });
    }
    console.log('events: ', events);
    return events;
  }
}

// BEWARE, this is a singleton, so it will be shared across all mfe, ALWAYS clean up with unsubscribe when done
export const mediatorInstance = new Mediator();
export type MediatorType = typeof mediatorInstance;

// export default mediatorInstance to window for every mfe to access
window.entando = window.entando || {};
window.entando.globals = window.entando.globals || {};
window.entando.globals.mediator = window.entando.globals.mediator || mediatorInstance;