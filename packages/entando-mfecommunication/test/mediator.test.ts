/* eslint-disable @typescript-eslint/ban-ts-comment */
import { expect, describe, it, beforeEach, vi } from 'vitest'
import { Mediator, Callback, EventCallback } from '../src/Mediator'

describe('Mediator', () => {
  let mediator: Mediator
  const eventType = 'testEvent'
  const callerId = 'testCaller'
  const callback: Callback = (data?: unknown) => data 

  beforeEach(() => {
    mediator = new Mediator()
  })

  it('should be able to subscribe to events', () => {
    const eventCallback: EventCallback = {
      callerId,
      callback
    }
    mediator.subscribe(eventType, eventCallback)
    expect(mediator.listSubscribersForEvent(eventType)).toContain(callerId)
  })

  it('should be able to unsubscribe from events', () => {
    const eventCallback: EventCallback = {
      callerId,
      callback
    }
    mediator.subscribe(eventType, eventCallback)
    mediator.unsubscribe(eventType, callerId)
    expect(mediator.listSubscribersForEvent(eventType)).not.toContain(callerId)
  })

  it('should be able to unsubscribe from all events of a subscriber', () => {
    const eventCallback: EventCallback = {
      callerId,
      callback
    }
    mediator.subscribe(eventType, eventCallback)
    mediator.unsubscribeAllEventsOfSubscriber(callerId)
    expect(mediator.listEventsForSubscriber(callerId)).toHaveLength(0)
  })

  it('should be able to unsubscribe all subscribers from an event', () => {
    const eventCallback: EventCallback = {
      callerId,
      callback
    }
    mediator.subscribe(eventType, eventCallback)
    mediator.unsubscribeAllSubscribersOfEvent(eventType)
    expect(mediator.listSubscribersForEvent(eventType)).toHaveLength(0)
  })

  it('should be able to unsubscribe all', () => {
    const eventCallback: EventCallback = {
      callerId,
      callback
    }
    mediator.subscribe(eventType, eventCallback)
    mediator.unsubscribeAll()
    expect(mediator.listSubscribers()).toHaveLength(0)
  })

  it('should be able to publish to subscribers', () => {
    const eventCallback: EventCallback = {
      callerId,
      callback: vi.fn()
    }
    mediator.subscribe(eventType, eventCallback)
    mediator.publish(eventType, 'data')
    expect(eventCallback.callback).toHaveBeenCalledWith('data')
  })

  it('should be able to publish to a specific subscriber', () => {
    const eventCallback1: EventCallback = {
      callerId: 'caller1',
      callback: vi.fn()
    }
    const eventCallback2: EventCallback = {
      callerId: 'caller2',
      callback: vi.fn()
    }
    mediator.subscribe(eventType, eventCallback1)
    mediator.subscribe(eventType, eventCallback2)
    mediator.publishToSubscribers(eventType, ['caller2'], 'data')
    expect(eventCallback1.callback).not.toHaveBeenCalled()
    expect(eventCallback2.callback).toHaveBeenCalledWith('data')
  })

  it('should be able to publish to all subscribers except one', () => {
    const eventCallback1: EventCallback = {
      callerId: 'caller1',
      callback: vi.fn()
    }
    const eventCallback2: EventCallback = {
      callerId: 'caller2',
      callback: vi.fn()
    }
    mediator.subscribe(eventType, eventCallback1)
    mediator.subscribe(eventType, eventCallback2)
    mediator.publishExceptToSubscribers(eventType, ['caller2'], 'data')
    expect(eventCallback1.callback).toHaveBeenCalledWith('data')
    expect(eventCallback2.callback).not.toHaveBeenCalled()
  })

  it('should list all subscribers', () => {
    const eventCallback1: EventCallback = {
      callerId: 'caller1',
      callback: vi.fn()
    }
    const eventCallback2: EventCallback = {
      callerId: 'caller2',
      callback: vi.fn()
    }
    mediator.subscribe('event1', eventCallback1)
    mediator.subscribe('event2', eventCallback2)
    const subscribers = mediator.listSubscribers()
    expect(subscribers).toEqual([
      {eventType: 'event1', subscriber: 'caller1'},
      {eventType: 'event2', subscriber: 'caller2'},
    ])
  })

  it('should list all subscribers for a specific event', () => {
    const eventCallback1: EventCallback = {
      callerId: 'caller1',
      callback: vi.fn()
    }
    const eventCallback2: EventCallback = {
      callerId: 'caller2',
      callback: vi.fn()
    }
    mediator.subscribe('event1', eventCallback1)
    mediator.subscribe('event1', eventCallback2)
    const subscribers = mediator.listSubscribersForEvent('event1')
    expect(subscribers).toEqual(['caller1', 'caller2'])
  })

  it('should list all events', () => {
    const eventCallback: EventCallback = {
      callerId,
      callback
    }
    mediator.subscribe('event1', eventCallback)
    mediator.subscribe('event2', eventCallback)
    const events = mediator.listEvents()
    expect(events).toEqual(['event1', 'event2'])
  })

  it('should list all events for a specific subscriber', () => {
    const eventCallback: EventCallback = {
      callerId,
      callback
    }
    mediator.subscribe('event1', eventCallback)
    mediator.subscribe('event2', eventCallback)
    const events = mediator.listEventsForSubscriber(callerId)
    expect(events).toEqual(['event1', 'event2'])
  })

  it('should not throw when unsubscribing from a non-existing event', () => {
    expect(() => {
      mediator.unsubscribe('nonExistingEvent', callerId)
    }).not.toThrow()
  })

  it('should not throw when unsubscribing a non-existing subscriber', () => {
    expect(() => {
      mediator.unsubscribe(eventType, 'nonExistingSubscriber')
    }).not.toThrow()
  })

  it('should not throw when publishing a non-existing event', () => {
    expect(() => {
      mediator.publish('nonExistingEvent', 'data')
    }).not.toThrow()
  })

  it('should throw when subscribing with a non-string eventType', () => {
    const eventCallback: EventCallback = {
      callerId,
      callback
    }
    expect(() => {
      // @ts-ignore
      mediator.subscribe(null, eventCallback)
    }).toThrow('eventType must be a string')
  })

  it('should throw when subscribing with a non-object eventCallback', () => {
    expect(() => {
      // @ts-ignore
      mediator.subscribe(eventType, null)
    }).toThrow('eventCallback must be an object with callerId and callback properties')
  })

  it('should throw when subscribing with a non-string callerId', () => {
    const eventCallback: EventCallback = {
      // @ts-ignore
      callerId: null,
      callback
    }
    expect(() => {
      mediator.subscribe(eventType, eventCallback)
    }).toThrow('eventCallback.callerId must be a string')
  })

  it('should throw when subscribing with a non-function callback', () => {
    const eventCallback: EventCallback = {
      callerId,
      // @ts-ignore
      callback: null
    }
    expect(() => {
      mediator.subscribe(eventType, eventCallback)
    }).toThrow('eventCallback.callback must be a function')
  })

})