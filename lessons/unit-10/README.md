# Unit 10

As a last step to have a functional application we need to retrieve memes from the database and show them in the timeline. Remember we have two timelines: the global timeline in the home section where a logged user can see all the memes posted by all users and, the personal timeline in the profile section where user can see all the memes posted by him/her.

## Steps

### Finish sections for Home and Profile

Right know we have a working `Add` section under the `/add` url, in addition to the login and signup screens, but we need to have a real home and profile screens.

#### Home section

Start updating the `containers/Home.js` file. The `render` methods will look like:

```javascript
  render() {
    const { data, fetching, error } = this.props;

    return (
      <Layout section={urls.HOME}>
        <AppBar />

        <Timeline
          data={data}
          loading={fetching}
          error={error && error.message}
          onScroll={this.handleScroll}
        />
      </Layout>
    );
  }
```

The `Layout` component (really it is a container) will occupy the whole screen and optionally will draw the bottom `NavigationBar` component. The `AppBar` component is used to show the top application bar with the logo and title of the section. Finally the `Timeline` component will fill the rest of the space and will show the memes.

![home](../images/042.png)

We need to load memes when the component is mounted but also when the user scrolls the timeline and arrives at the end. The idea is also to load memes incrementally, for example in chunks of 10 memes. The `Timeline` component has an `onScroll` property that will be invoked each time the timeline arrives at the end. This will allow us to know when we need to load more memes.

```javascript
// Debounce the action to load memes to avoid triggering tons of requests
  requestSparks = debounce(
    () => {}, // This is the function that will load the memes
    250,
  ).bind(this);

  componentDidMount() {
    // Load memes when the component is mounted
    this.requestSparks();
  }

  handleScroll = () => {
    const { data } = this.props;
    const size = data.length;
    const lastKey = size && data[size - 1].key;

    // Load memes when we reach the bottom of the timeline
    this.requestSparks(lastKey);
  }
```

Note how we debounce the invocation to the function that will request for memes to avoid triggering tons of actions.

#### Profile section

Lets create a `containers/Profile.js` file. The code will be very similar to the `Home` section. We make use of the `Layout`, `AppBar` and `Timeline` but also introduce the `ProfileSummary` component that will show some info about the user and let us the option to logout from the application.

```javascript
  render() {
    const {
      user, data, fetching, error,
    } = this.props;

    return (
      <Layout section={urls.PROFILE}>
        <AppBar title="Profile" />

        <ProfileSummary
          userInfo={user}
          onLogout={this.handleLogout}
        />

        <TimelineWrapper>
          <Timeline
            data={data}
            loading={fetching}
            error={error && error.message}
            onScroll={this.handleScroll}
          />
        </TimelineWrapper>
      </Layout>
    );
  }
```

![profile](../images/042.png)

Update the `containers/App.js` file to import the `Profile` component and add it to the known routes:

```javascript
...
import Profile from './Profile';
...
  render() {
    const { user } = this.props;
    ...
    // If user is logged in setup the different routes
    return (
      <Router>
        <Switch>
          <Route exact path={urls.HOME} component={Home} />
          <Route exact path={urls.ADD} component={Add} />
          <Route exact path={urls.PROFILE} component={Profile} />
          <Route path={urls.LOGIN} component={LoginForm} />
          <Route path={urls.SIGNUP} component={SignupForm} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    );
  }
```

For the logout we invoke the `logout` action (that will make a signout of the user in Firebase Authentication) and push the home url in the browser history:

```javascript
  handleLogout = () => {
    const { logout, history } = this.props;
    logout();
    history.push(urls.HOME);
  }
```

> NOTE: The `Profile` component receives the `history` property because it is a child of the `Route` component used in the `App.js`. In any other case, if you desire to access the history or react-router info in a component you need to wrap it with the HOC `withRouter`

### Create actions, sagas and reducers to load memes
