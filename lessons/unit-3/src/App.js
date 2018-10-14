import React from 'react';
import styled from 'styled-components';
import {
  BrowserRouter, Switch, Route, Link,
} from 'react-router-dom';
import SignupForm from './components/SignupForm';
import NotFound from './components/NotFound';

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

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/signup" component={SignupForm} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default App;
