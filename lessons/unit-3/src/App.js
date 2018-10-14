import React from 'react';
import styled from 'styled-components';
import {
  BrowserRouter, Switch, Route, Link,
} from 'react-router-dom';

import './globalStyles';

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

const NotFound = () => (
  <FullScreenWrapper backgroundColor="#999">
    Not found :( Better <Link to="/">go home</Link>
  </FullScreenWrapper>
);

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/signup" component={Signup} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default App;
