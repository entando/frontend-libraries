import * as messages from 'index';

describe('exports all messages functionalities', () => {
  it('is an object', () => {
    expect(typeof messages).toBe('object');
  });

  describe('messages', () => {
    it('exports messages', () => {
      expect(messages).toHaveProperty('messages', expect.any(Function));
    });

    describe('errors', () => {
      it('exports addErrors', () => {
        expect(messages).toHaveProperty('addErrors', expect.any(Function));
      });

      it('exports clearErrors', () => {
        expect(messages).toHaveProperty('addErrors', expect.any(Function));
      });

      it('exports getErrors', () => {
        expect(messages).toHaveProperty('getErrors', expect.any(Function));
      });
    });

    describe('toasts', () => {
      it('exports addToast', () => {
        expect(messages).toHaveProperty('addToast', expect.any(Function));
      });

      it('exports removeToast', () => {
        expect(messages).toHaveProperty('removeToast', expect.any(Function));
      });

      it('exports getToasts', () => {
        expect(messages).toHaveProperty('getToasts', expect.any(Function));
      });

      it('exports TOAST_ERROR', () => {
        expect(messages).toHaveProperty('TOAST_ERROR', 'error');
      });

      it('exports TOAST_INFO', () => {
        expect(messages).toHaveProperty('TOAST_INFO', 'info');
      });

      it('exports TOAST_WARNING', () => {
        expect(messages).toHaveProperty('TOAST_WARNING', 'warning');
      });

      it('exports TOAST_SUCCESS', () => {
        expect(messages).toHaveProperty('TOAST_SUCCESS', 'success');
      });
    });
  });
});
