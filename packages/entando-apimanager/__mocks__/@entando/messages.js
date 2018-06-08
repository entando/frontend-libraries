const mock = jest.genMockFromModule('@entando/messages');
const real = require.requireActual('@entando/messages');

mock.messages = real.messages;
mock.getErrors = real.getErrors;
mock.addToast = real.addToast;
mock.clearErrors = real.clearErrors;
mock.addErrors = real.addErrors;

jest.spyOn(mock, 'clearErrors');
jest.spyOn(mock, 'addToast');

export const {
  messages,
  addToast,
  removeToast,
  getToasts,
  clearErrors,
  addErrors,
  getErrors,
  TOAST_ERROR,
  TOAST_SUCCESS,
} = mock;
