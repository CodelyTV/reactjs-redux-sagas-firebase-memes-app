import { combineReducers } from 'redux';
import authReducer from './ducks/auth/reducer';

export default combineReducers({
  auth: authReducer,
});
