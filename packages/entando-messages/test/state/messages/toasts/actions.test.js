import { isFSA } from 'flux-standard-action';
import { addToast, removeToast } from 'state/messages/toasts/actions';
import { ADD_TOAST, REMOVE_TOAST } from 'state/messages/toasts/types';

describe('state/messages/toasts/actions', () => {
  let action;
  describe('addToast', () => {
    beforeEach(() => {
      action = addToast('message', 'test');
    });

    it('is FSA compliant', () => {
      expect(isFSA(action)).toBe(true);
    });

    it('is of type ADD_TOAST', () => {
      expect(action).toHaveProperty('type', ADD_TOAST);
    });

    it('defines payload property', () => {
      expect(action).toHaveProperty('payload');
      expect(action).toHaveProperty('payload.message', 'message');
      expect(action).toHaveProperty('payload.type', 'test');
    });
  });

  describe('removeToast', () => {
    beforeEach(() => {
      action = removeToast('a');
    });

    it('is FSA compliant', () => {
      expect(isFSA(action)).toBe(true);
    });

    it('is of type REMOVE_TOAST', () => {
      expect(action).toHaveProperty('type', REMOVE_TOAST);
    });

    it('defines payload property', () => {
      expect(action).toHaveProperty('payload');
      expect(action).toHaveProperty('payload.id', 'a');
    });
  });
});
