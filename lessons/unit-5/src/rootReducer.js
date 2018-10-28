import { combineReducers } from 'redux';
import initialState from './initialState';

export default combineReducers({
  auth: () => initialState.auth,
});
