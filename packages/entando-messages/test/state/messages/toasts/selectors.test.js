import { getToasts } from 'state/messages/toasts/selectors';

const STATE = {
  messages: {
    toasts: {
      a: { message: 'one', type: 'test' },
      b: { message: 'two', type: 'test2' },
    },
  },
};

describe('state/messages/toasts/selectors', () => {
  it('getToasts return the toasts list', () => {
    expect(getToasts(STATE)).toHaveProperty('a', { message: 'one', type: 'test' });
    expect(getToasts(STATE)).toHaveProperty('b', { message: 'two', type: 'test2' });
  });
});
