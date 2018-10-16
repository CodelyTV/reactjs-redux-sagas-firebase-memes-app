# Unit 5

In this unit we are going to introduce `redux` and `redux-sagas` and show how they can help us to sepparate the business logic from presentation to create more scalable applications.

## Steps

### Container/Presentational pattern

Currently, the current `SignupForm` is responsible to render the form but also to create the user. Let's sepparate this two responsibilities in two different components. To do so we apply the [Presentation/Container](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0) pattern:

- Presentational component: Concern about how things look. We will put our presentational inside `src/components`.
- Container component: Concern about how things work or how to do things. We will put our container components inside inside `src/containers`.

Basically we get the code from `component/SignupForm` and extract the logic on how to create a Firebase user to `container/SignupForm`.

```javascript
/* continer/SignupForm */
class SignupForm extends PureComponent {
  state = {
    user: null,
    fetching: false,
    error: null,
  }

  handleCreateUser = async (username, email, password) => {
    this.setState({ fetching: true });
    try {
      const auth = firebase.auth();
      const userCredential = await auth.createUserWithEmailAndPassword(email, password);
      if (userCredential) {
        const { user } = userCredential;
        await user.updateProfile({ displayName: username });

        this.setState({
          user,
          fetching: false,
        });
      }
    } catch (error) {
      this.setState({
        fetching: false,
        error,
      });
    }
  }

  render() {
    const { user, fetching, error } = this.state;
    const errorMessage = error && error.message;

    // If we are logged redirect to home
    if (user) {
      return <Redirect to={urls.HOME} />;
    }

    return (
      <SignupFormRender
        loading={fetching}
        errorMessage={errorMessage}
        onSubmit={this.handleCreateUser}
      />
    );
  }
}
```

> NOTE: We are using the container's state to hold the state of the form (so, in essence we have not improved anything `:_)`)

  - `fetching` to know if we are registering the new user
  - `error` to store any current error
  - `user` to store the new created user

In addition we are using the `Redirect` component from `react-router` project. This component basically redirects to a new location with it is rendered.

```javascript
if (user) {
  return <Redirect to={urls.HOME} />;
}
```

### Introducing `redux`

Let's start installing `redux`: `$ yarn add redux react-redux`.

Working with redux requires create classes for actions, reducers and so on, because of this we organize all that code into *ducks*. All the code we are going to do is about authentication so we are going to create the folder `src/ducks/auth` and put inside any code related with that:

- `types.js`, Define some constants used along the duck
- `actions.js`, contains the actions creators, that is, functions that return a JS object used as *actions* by redux.
- `reducers.js`, contains the reducer code that handle auth data within the state.



### Introducing selectors

TODO !!!
