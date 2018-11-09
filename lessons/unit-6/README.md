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

### Rethinking our workflow with sagas

Lets modify our code. The final flow must be as follow:

- Once the user complete the signup form we trigger a `NEW_USER_REQUEST` actions. By convention we will add the sufffix `_REQUEST` to all actions that *activate*  a saga.
- A saga will catch the action, and proceed to create the new user. First we launch a `NEW_USER_START` action. This will allow us to update the state so that the `components/SignupForm` could show a load indicator.
- Next we will try to create the user:
  - if all works fine we will trigger a `NEW_USER_SUCCESS` action passing the user information so that the reducer can store it.
  - Otherwise, if something goes wrong, we will trigger a `NEW_USER_FAILURE` passing the error so that the reducer could store the error and it could be shown by the `components/SignupForm`.

#### Update actions

Lets update and create new actions for previoudly commented actions:

```javascript
export const newUserRequest = ({ username, email, password }) => ({
  type: 'NEW_USER_REQUEST',
  payload: {
    username,
    email,
    password,
  },
});

export const newUserStart = () => ({
  type: 'NEW_USER_START',
});

export const newUserSuccess = user => ({
  type: 'NEW_USER_SUCCESS',
  payload: {
    user,
  },
});

export const newUserFailure = error => ({
  type: 'NEW_USER_FAILURE',
  payload: {
    error,
  },
});
```

#### Update the reducer

Lets update our reducer to take into account the `NEW_USER_START`, `NEW_USER_SUCCESS` and `NEW_USER_FAILURE`. Note how we are ignoring the `NEW_USER_REQUEST` action, because it is only used to activate the sage:

```javascript
import initialState from '../../initialState';

const defaultState = initialState.auth;

// First time the reducers is executed the `state` is null, this way we return
// the initial value desired for our slice.
export default (state = defaultState, action) => {
  switch (action.type) {
    case 'NEW_USER_START':
      return {
        fetching: true,
        user: null,
        error: null,
      };

    case 'NEW_USER_FAILURE':
      return {
        fetching: false,
        user: null,
        error: action.payload.error,
      };

    case 'NEW_USER_SUCCESS':
      return {
        fetching: false,
        user: action.payload.user,
        error: null,
      };

    default:
      return state;
  }
};
```

#### Create our saga

Create a new `ducks/auth/sagas.js` file and add the next code:

```javascript
import { takeLatest, put, call } from 'redux-saga/effects';
import * as actions from './actions';
import firebase from '../../services/firebase';

function* newUser(action) {
  const { username, email, password } = action.payload;

  yield put(actions.newUserStart());

  try {
    const auth = firebase.auth();
    const userCredential = yield call([auth, auth.createUserWithEmailAndPassword], email, password);
    if (userCredential) {
      const { user } = userCredential;
      yield call([user, user.updateProfile], { displayName: username });

      yield put(actions.newUserSuccess(user));
    }
  } catch (error) {
    yield put(actions.newUserFailure(error));
  }
}

export default function* () {
  yield takeLatest('NEW_USER_REQUEST', newUser);
}
```

We are exporting a function (really a generator) that catch every `NEW_USER_REQUEST` action and delegates to the `newUser` function (another generator).

On its way the `newUser` function trigger the `NEW_USER_START` action, tries to create the user and triggers `NEW_USER_SUCCESS` or `NEW_USER_FAILURE` depending on the result.

The last one step is to add our saga to the `rootSaga`, so that `redux-saga` knows about it. Go to `./rootSaga.js` file and update like this:

```javascript
import { all } from 'redux-saga/effects';
import authSagas from './ducks/auth/sagas';

export default function* rootSaga() {
  yield all([
    authSagas(),
  ]);
}
```

### Update the SignupForm to trigger the `NEW_USER_REQUEST` action

Finally, update the `containers/SignupForm.js` file to trigger the action that will activate our saga and create the user:

```javascript
...
import { newUserRequest } from '../ducks/auth/actions';
...

class SignupForm extends PureComponent {
  ...
  handleCreateUser = async (username, email, password) => {
    const { newUserAction } = this.props;
    newUserAction({ username, email, password });
  }
  ...
}

...

const mapDispatchToProps = dispatch => ({
  newUserAction: user => dispatch(newUserRequest(user)),
});

...
```

### Start using the app state in other component

Now that we store the logged user information in the redux store, that is, in our application state, we can start using those information in other components that requires it. As example we are going to modify `Home` component in the `src/App.js` file to show the current user logged name.

Modify the next lines:

```javascript
const Home = () => (
  <FullScreenWrapper>
    This is the Home ! But you can go to <Link to={urls.SIGNUP}>signup section</Link> or navigate to an invalid place <Link to="/not-exists">invalid place</Link>
  </FullScreenWrapper>
);
``` 

to the next:

> Take into account it is only as a sample. It is not a *good* idea to use one file to store two different presentational comoponents and a conteiner one:

```javascript
const HomeComponent = (props) => {
  const { user } = props;

  return (
    <FullScreenWrapper>
      <div>
        You are logged as: {user ? user.displayName : 'NOT LOGGED'}
        <br />
        This is the Home ! But you can go to <Link to={urls.SIGNUP}>signup section</Link> or navigate to an invalid place <Link to="/not-exists">invalid place</Link>
      </div>
    </FullScreenWrapper>
  );
};

HomeComponent.defaultProps = {
  user: null,
};

HomeComponent.propTypes = {
  user: PropTypes.object,
};

const mapStateToProps = state => ({
  user: state.auth.user,
});

const Home = connect(mapStateToProps)(HomeComponent);
```

In summary, we are creating a container for the `Home` which receives the `state.auth.user` property.

### Introduce selectors

Right now we are accessing the `state.auth.user` property in two different parts of our code: in the `SignupForm` and in the `Home` containers. That means we need to remember the path to the `user` within the store each time we need to use it.

Selectors are also great for memoize derived data. Suppose one of your store properties is an array of objects with a price attribute. Imagine you want to compute the sum of all prices to be shown in some components. Selectors allow us to compute that sum and memoize it so next time you access the selector values are not recomputed again.

Start installing the [reselect](https://github.com/reduxjs/reselect) dependency: `$ yarn add reselect`.

Next, create a `ducks/auth/selectors.hs` file which will contain the selectors used to get the `auth` properties like `user`, `isFetching` or `error`:

```javascript
import { createSelector } from 'reselect';

const authSelector = state => state.auth;

export const userSelector = createSelector(
  authSelector,
  auth => auth.user,
);

export const fetchingSelector = createSelector(
  authSelector,
  auth => auth.fetching,
);

export const errorSelector = createSelector(
  authSelector,
  auth => auth.error,
);
```

The `createSelector` function requires two arguments:

- an input selector. A function that will receive the `state` and must return the desired property.
- a result function. A function that returns a value from the previous given the property.

Now lets update `src/App.js` and `src/container/SignupForm` to use the selector instead retrieving state properties directly:

```javascript
// src/App.js
...
import { userSelector } from './ducks/auth/selectors';
...
const mapStateToProps = state => ({
  user: userSelector(state),
});
...
```

```javascript
...
import { userSelector, fetchingSelector, errorSelector } from '../ducks/auth/selectors';
...
const mapStateToProps = state => ({
  user: userSelector(state),
  fetching: fetchingSelector(state),
  error: errorSelector(state),
});
...
```