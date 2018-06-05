import { isFSA } from 'flux-standard-action';
import { addErrors, clearErrors } from 'state/messages/errors/actions';
import { ADD_ERRORS, CLEAR_ERRORS } from 'state/messages/errors/types';

const ERRORS = [
  'Error message 1',
  'Error message 2',
];

describe('state/messages/errors/actions', () => {
  describe('addErrors', () => {
    let action;

    beforeEach(() => {
      action = addErrors(ERRORS);
    });

    it('is FSA compliant', () => {
      expect(isFSA(action)).toBe(true);
    });

    it('is of type ADD_ERRORS', () => {
      expect(action).toHaveProperty('type', ADD_ERRORS);
    });

    it('defines the "errors" payload property', () => {
      expect(action).toHaveProperty('payload.errors', ERRORS);
    });
  });

  describe('clearErrors', () => {
    let action;

    beforeEach(() => {
      action = clearErrors();
    });

    it('is FSA compliant', () => {
      expect(isFSA(action)).toBe(true);
    });

    it('is of type CLEAR_ERRORS', () => {
      expect(action).toHaveProperty('type', CLEAR_ERRORS);
    });
  });
});
