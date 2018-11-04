# Unit 6

Right know our application has the logic of registering a new user in the `src/containers/SignupForm`. In this unit we are going to improve our code separating that side-effects with `redux-sagas`. 

In addition to store, actions and reducers, redux comes with another important concept: **middlewares**.

> A middleware provides a third-party extension point between dispatching an action, and the moment it reaches the reducer. People use Redux middleware for logging, crash reporting, **talking to an asynchronous API**, routing, and more.

```
+-----------+           +-------------+           +------------+
|           |           |             |           |            |
|  actions  +---------> | middlewares +---------> |  reducers  |
|           |           |             |           |            |
+-----------+           +-------------+           +-----+------+
                                                        |
     ^                                                  |
     |                                                  |
     |        +---------+            +---------+        |
     |        |         |            |         |        |
     +------+ |  views  | <--------+ |  store  | <------+
              |         |            |         |
              +---------+            +---------+
```

On its way:

> `redux-saga` is a library that aims to make application side effects (i.e. asynchronous things like data fetching and impure things like accessing the browser cache) easier to manage, more efficient to execute, easy to test, and better at handling failures.

So, a middleware seats between actions and reducers and its code can trigger its own actions.

## Steps

### Initialize redux-sagas

Start installing redux-sagas with `$ yarn add redux-saga`.

`redux-saga` is a redux middleware because of this we need to configure in the redux store. Update the `store.js` file to include the `redux-saga` middleware:

```javascript
/* eslint-disable no-underscore-dangle */
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import initialState from './initialState';
import rootReducer from './rootReducer';
import rootSaga from './rootSaga';

// In development, configure middleware for redux devtools
// (see: https://github.com/zalmoxisus/redux-devtools-extension)
const composeEnhancers = process.env.NODE_ENV === 'development'
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  : compose;

const sagaMiddleware = createSagaMiddleware();

const enhancer = composeEnhancers(
  applyMiddleware(sagaMiddleware), // Prepare for future middlewares
);

const store = createStore(
  rootReducer,
  initialState,
  enhancer,
);

sagaMiddleware.run(rootSaga);

export default store;
```

Our app could make use of many sagas, because of this we need a *root saga that runs all them*. Lets create the `src/rootSaga.js` file:

```javascript
import { all } from 'redux-saga/effects';

export default function* rootSaga() {
  yield all([]);
}
```

Notes:
- A saga is a generator that runs side effects defined by `redux-saga`.
- The side effect `all` is a kind of effect that runs an array of generators (or sagas).
- For the moment we are not running any saga 😄

