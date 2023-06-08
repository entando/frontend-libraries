console.log('Debug: Mediator.ts file loaded');

export type Callback = (data?: unknown) => void;

export interface EventCallback {
  callerId: string;
  callback: Callback;
} 

export class Mediator {
  private events: Record<string, EventCallback[]>;

  constructor() {
    this.events = {};
  }

  private verifyString(name: string, str: string): void {
    if (typeof str !== 'string') {
      throw new Error(`${name} must be a string`);
    }
  }

  private verifyArrayOfStrings(name: string, arr: unknown[]): void {
    if (!Array.isArray(arr)) {
      throw new Error(`${name} must be an array`);
    }
    arr.forEach(str => {
      if (typeof str !== 'string') {
        throw new Error(`${name} must be an array of strings`);
      }
    }
    );
  }

  private verifyCallback(name: string, callback: Callback): void {
    if (typeof callback !== 'function' || !callback) {
      throw new Error(`${name} must be a function`);
    }
  }

  private verifyEventCallback(eventCallback: EventCallback): void {
    if (typeof eventCallback !== 'object' || !eventCallback) {
      throw new Error('eventCallback must be an object with callerId and callback properties');
    }
    this.verifyString('eventCallback.callerId', eventCallback.callerId);
    this.verifyCallback('eventCallback.callback', eventCallback.callback);
  }

  subscribe(eventType: string, eventCallback: EventCallback): void {
    this.verifyString('eventType', eventType);
    this.verifyEventCallback(eventCallback);

    if (!this.events[eventType]) {
      this.events[eventType] = [];
    }
    this.events[eventType].push(eventCallback);
  }

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
      this.events[event] = this.events[event].filter(cb => cb.callerId !== callerId);
    }
  }

  unsubscribeAllSubscribersOfEvent(eventType: string): void {
    this.verifyString('eventType', eventType);
    if (this.events[eventType]) {
      this.events[eventType] = [];
    }
  }

  unsubscribeAll(): void {
    for (const event in this.events) {
      this.events[event] = [];
    }
  }

  publish(eventType: string, data?: unknown): void {
    this.verifyString('eventType', eventType);
    if (this.events[eventType]) {
      this.events[eventType].forEach(cb => cb.callback(data));
    }
  }

  publishToSubscribers(eventType: string, callerIds: string[], data?: unknown): void {
    this.verifyString('eventType', eventType);
    this.verifyArrayOfStrings('callerIds', callerIds);
    if (this.events[eventType]) {
      this.events[eventType].forEach(cb => {
        if (callerIds.includes(cb.callerId)) {
          cb.callback(data);
        }
      });
    }
  }

  publishExceptToSubscribers(eventType: string, callerIds: string[], data?: unknown): void {
    this.verifyString('eventType', eventType);
    this.verifyArrayOfStrings('callerIds', callerIds);
    if (this.events[eventType]) {
      this.events[eventType].forEach(cb => {
        if (!callerIds.includes(cb.callerId)) {
          cb.callback(data);
        }
      });
    }
  }

  listSubscribers(): Array<{eventType: string, subscriber: string}> {
    const subscribers: Array<{eventType: string, subscriber: string}> = [];
    for (const event in this.events) {
      this.events[event].forEach(cb => subscribers.push({eventType: event, subscriber: cb.callerId}));
    }
    return subscribers;
  }

  listSubscribersForEvent(eventType: string): string[] {
    const subscribers: string[] = [];
    if (this.events[eventType]) {
      this.events[eventType].forEach(cb => subscribers.push(cb.callerId));
    }
    return subscribers;
  }

  listEvents(): string[] {
    const events: string[] = [];
    for (const event in this.events) {
      events.push(event);
    }
    return events;
  }

  listEventsForSubscriber(subscriber: string): string[] {
    const events: string[] = [];
    for (const event in this.events) {
      this.events[event].forEach(cb => {
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