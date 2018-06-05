import reducer from 'state/messages/reducer';

describe('state/messages/reducer', () => {
  let state;
  beforeEach(() => {
    state = reducer();
  });

  describe('default state', () => {
    it('should contain errors and toasts', () => {
      expect(state).toBeDefined();
      expect(state).toHaveProperty('errors');
      expect(state).toHaveProperty('toasts');
    });
  });
});
