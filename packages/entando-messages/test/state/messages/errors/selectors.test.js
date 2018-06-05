
import { getErrors } from 'state/messages/errors/selectors';

const ERRORS = [
  'Error message 1',
  'Error message 2',
];

const STATE = {
  messages: {
    errors: ERRORS,
  },
};


describe('state/messages/errors/selectors', () => {
  describe('getErrors', () => {
    it('returns the errors state', () => {
      expect(getErrors(STATE)).toEqual(ERRORS);
    });
  });
});
