# Unit 7

This unit presents how to manage autologin. Firebase authentication stores state locally to avoid users the need to login each time start a session.

## Steps

### Code changes

From Unit-6 we have made some code changes:

- Extracted actions names as constants in the `ducks/auth/types.js`.
- Renamed `newUser...` actions to `createUser...`.
- Store `Home` as a new container components.
- Moved `App.js` from `src` to `src/containers`.
- Moved logic to create a user from the `ducks/auth/saga.js` to `services/AuthServices.js`.
- Update `components/NotFound.js` to looks better.

### Get current user session

Right now if you refresh the browser, no matter if you just created a new user the home screen of our app will show like this:

![home](../images/020.png)

Firebase stores authentication state locally. This means when our app starts we need to check if there is any auth state present and recover it, otherwise there is no user and need to allow login or signup.

The idea to implement is as follow:

- When starting the application show a loading progress indicator:
  ![loading](../images/021.png)

- Check if authentication state is stores, if so recover it and show home screen:
  ![home](../images/020.png)

- Otherwise show the user the login screen:

PUT IMAGE HERE !!!

### Listening for authentication changes

The Firebase SDK allows to know, not only the current user, but listen for any change in the current user (that is, is user logouts or a new user login) with the method [`onAuthStateChanged()`](https://firebase.google.com/docs/reference/js/firebase.auth.Auth#onAuthStateChanged)

The method accepts a callback that will be invoked with a `user` parameter that can be `null` if no user is loggedin or an instance of [`firebase.User`](https://firebase.google.com/docs/reference/js/firebase.User).


### Recovering the authentication state when app starts

Lets modify our `containers/App.js` file to take into account if the user authentication exists. We are going to add the `componentDidMount` method to check if there is a value at `state.auth.user`:

```javascript
  componentDidMount() {
    const { loginUserAction, logoutUserAction } = this.props;

    AuthService.onAuthStateChanged((user) => {
      if (user) {
        loginUserAction(user);
      } else {
        logoutUserAction();
      }
      this.setState({
        authChecked: true,
      });
    });
  }
```

If there is a user we need to trigger a `loginUser` actions. On the other hand if there is no user we need to trigger `logoutUser` action. Because of this modify the `ducks/auth/types.js` and `ducks/auth/actions.js` files to add the need code for login and logout actions.

Because the login and logout action requires a side effect we are going to add a cuple of sagas to our `ducks/auth/sagas.js` file to handle them:

```javascript
...

function* loginUser(action) {
  yield put(actions.loginUserStart());

  try {
    const user = yield call(AuthService.loginUser, action.payload);
    yield put(actions.loginUserSuccess(user));
  } catch (error) {
    yield put(actions.loginUserFailed(error));
  }
}

function* logoutUser() {
  yield call(AuthService.logoutUser);
}

export default function* () {
  yield all([
    yield takeLatest(types.CREATE_USER_REQUEST, createUser),
    yield takeLatest(types.LOGIN_USER_REQUEST, loginUser),
    yield takeLatest(types.LOGOUT_USER, logoutUser),
  ]);
}
```

Finally, we need to modify our reducer to take care of `loingUserSuccess` and `logoutUSer` actions, so that the store were modified.

### Show loading progress

Meanwhile we determine if there is a user value in the store, we will show a loading progress indicator represented by the `components/Start.js` components.

To control this we have added a `authChecked` property to the `containers/App.js` container. This way if `authChecked=false` we will render the `Start` component otherwise the home screen. Once the `onAuthStateChanged` callback is executed we will set this property to true.

```javascript
class App extends Component {
  state = {
    authChecked: false,
  }

  componentDidMount() {
    const { loginUserAction, logoutUserAction } = this.props;

    AuthService.onAuthStateChanged((user) => {
      ...
      this.setState({
        authChecked: true,
      });
    });
  }

  render() {
    const { authChecked } = this.state;

    if (!authChecked) {
      return <Start />;
    }

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path={urls.HOME} component={Home} />
          <Route path={urls.SIGNUP} component={SignupForm} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    );
  }
}
```
