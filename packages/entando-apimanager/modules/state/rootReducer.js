import { combineReducers } from 'redux';

import api from 'state/api/reducer';
import currentUser from 'state/current-user/reducer';

const reducerDef = {
  api,
  currentUser,
};

// app root reducer
const reducer = combineReducers(reducerDef);

export default reducer;
