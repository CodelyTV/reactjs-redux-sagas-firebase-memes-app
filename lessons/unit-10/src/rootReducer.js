import { combineReducers } from 'redux';
import authReducer from './ducks/auth/reducer';
import sparksReducer from './ducks/data/reducer';

export default combineReducers({
  auth: authReducer,
  sparks: sparksReducer,
});
