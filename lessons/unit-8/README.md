# Unit 8

In this unit we will create the section of the app responsible to add new memes and we will see how to query for memes to the [giphy](https://giphy.com/) service.

## Steps

### Before to start

Note, we start this unit with all the base components of our app created under `src/components` folder. You can see most of them in action running `$ yarn run storybook`.

Remember also to follow the steps described in *Unit 1* to get giphy API key.

### Create the *Add* section

Lets build our *Add* section. The idea is when the user goes to the `/add` url we show the screens necessary to:

- Input a search term, query on giphy service and show results:

[IMAGE]

- Once user selects an image we will show it with an option input to add a title:

[IMAGE]

- Finally if user post the meme we will show a modal for a few seconds indicating the meme is saved in his/her timeline.

[Image]

In the `constainers/Add.js` you will found the skeleton for the container responsible to handle the previous workflow. The problem is, right now, our app doesn't know how to render this container, because of this we need to import the container in the `containers/App.js` and a route:

```javascript
...
import Add from './Add';
...
    // If user is logged in setup the different routes
    return (
      <Router>
        <Switch>
          <Route exact path={urls.HOME} component={Home} />
          <Route exact path={urls.ADD} component={Add} />
          <Route path={urls.LOGIN} component={LoginForm} />
          <Route path={urls.SIGNUP} component={SignupForm} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    );
...
```

Now we can start the *add* process by accessing the url `http://localhost:3000/add`.
