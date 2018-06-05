import { combineReducers } from 'redux';

import errors from 'state/messages/errors/reducer';
import toasts from 'state/messages/toasts/reducer';

export default combineReducers({
  errors,
  toasts,
});
