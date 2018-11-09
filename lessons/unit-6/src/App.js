import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import {
  BrowserRouter, Switch, Route, Link,
} from 'react-router-dom';
import SignupForm from './containers/SignupForm';
import NotFound from './components/NotFound';
import urls from './urls';

import './globalStyles';

const FullScreenWrapper = styled.div`
  display: fixed;
  width: 100%;
  height: 100%;
  background-color: ${props => props.backgroundColor || '#FFFFFF'}
`;

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
