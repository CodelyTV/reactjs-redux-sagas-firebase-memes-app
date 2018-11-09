import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './Home';
import SignupForm from './SignupForm';
import NotFound from '../components/NotFound';
import urls from '../urls';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path={urls.HOME} component={Home} />
      <Route path={urls.SIGNUP} component={SignupForm} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default App;
