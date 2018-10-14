# Unit 3

Navigating among sections with [react-router](https://github.com/ReactTraining/react-router).

Our app is a 100% client side application, also know by SPA (Single Page Application). Than means, when use navigate among sections, for example from `/` to `/profile` there is no request to the server. The app is responsible to know which is the current URL and show the appropriate content.

## Steps

### react-router

We use `react-router` project to manage the app routes and navigability among them. Because we are working in a web project we need to install the subporject [`react-router-dom`](https://github.com/ReactTraining/react-router/tree/master/packages/react-router-dom): `$ yarn add react-router-dom`

> NOTE: `react-router` is a **dynamic routing** engine, that is, **routing takes place as your app is rendering**.

### App routing: first version

Remove all the files created by CRA under `src/` folder and only left:

- `index.js`, the app entry point. Remember to edit and remove references to `index.css` file.
  > The editor will mark the `document` variable as not defined. Because we know it is a global variable available on browsers we can indicate to eslint to forget that ise writing next comment at the top of the file `/* global document */`.
- `serviceWorker.js`, a service-worker automatically created by CRA that will cache our assets in production.
- `globalStyles.js`, contains some global styles for our app (it was created in the previous unit).
- `App.js`, the *root* component of our app.

Edit the `App.js` and left as simple as:

```javascript
import React from 'react';

const App = () => (
  <div>Dividi !</div>
);

export default App;
```

The our in this exercise is to create two components and configure `react-router` to navigate among them. So, within the `App.js` we are going to create two components: one to represent the home screen and one to represent the signup form:

```javascript
const FullScreenWrapper = styled.div`
  display: fixed;
  width: 100%;
  height: 100%;
  background-color: ${props => props.backgroundColor || '#FFFFFF'}
`;

const Home = () => (
  <FullScreenWrapper>
    This is the Home ! But you can go to <Link to="/signup">signup section</Link> or navigate to an invalid place <Link to="/not-exists">invalid place</Link>
  </FullScreenWrapper>
);

const Signup = () => (
  <FullScreenWrapper backgroundColor="#ccc">
    This is the signup ! Return to <Link to="/">home</Link>
  </FullScreenWrapper>
);
```

> NOTE: We have used `styled-components` to create the `FullScreenWrapper` component. It allows us to pass properties like the `backgroundColor`.

And update the `App` component to use `react-router` to decide which one to render depending on the url:

```javascript
const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/signup" component={Signup} />
    </Switch>
  </BrowserRouter>
);
```

> - Do not forget to include the `globalStyles.js`.

Now, check what happens if you write a url like `/do-not-exists`. We render nothing. Because of this we are going the create also a `NotFound` component that will be rendered when no route match the current url:

```javascript
const NotFound = () => (
  <FullScreenWrapper backgroundColor="#999">
    Not found :( Better <Link to="/">go home</Link>
  </FullScreenWrapper>
);
```

and update the `App` component with:

```javascript
const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/signup" component={Signup} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);
```

If you write `/`, `/sigmup` or `not-exists` in the browser url you will see the corresponding component. But there is a problem, each time we update the url we are making a call to the server. What we want is to have some *link* (in the future app some buttons) that allows us to *navigate* in our app without calling the server and reloading it.

Finally, update each component to use the `Link` provided by `react-router-dom` which allows to update the history url:

```javascript
const Home = () => (
  <FullScreenWrapper>
    This is the Home ! But you can go to <Link to="/signup">signup section</Link> or navigate to an invalid place <Link to="/not-exists">invalid place</Link>
  </FullScreenWrapper>
);

const Signup = () => (
  <FullScreenWrapper backgroundColor="#ccc">
    This is the signup ! Return to <Link to="/">home</Link>
  </FullScreenWrapper>
);

const NotFound = () => (
  <FullScreenWrapper backgroundColor="#999">
    Not found :( Better <Link to="/">go home</Link>
  </FullScreenWrapper>
);
```
Now we can navigate among app section without reloading the app, thans to `react-router`.
