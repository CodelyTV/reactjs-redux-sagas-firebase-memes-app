/* eslint-disable no-underscore-dangle */
import { createStore, applyMiddleware, compose } from 'redux';

import initialState from './initialState';
import rootReducer from './rootReducer';

// In development, configure middleware for redux devtools
// (see: https://github.com/zalmoxisus/redux-devtools-extension)
const composeEnhancers = process.env.NODE_ENV === 'development'
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  : compose;

const enhancer = composeEnhancers(
  applyMiddleware(), // Prepare for future middlewares
);

const store = createStore(
  rootReducer,
  initialState,
  enhancer,
);

export default store;
