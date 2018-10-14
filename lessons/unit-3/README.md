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