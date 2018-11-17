import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Home from './Home';
import SignupForm from './SignupForm';
import LoginForm from './LoginForm';
import NotFound from '../components/NotFound';
import urls from '../urls';
import AuthService from '../services/AuthService';
import Start from '../components/Start';
import Add from './Add';
import { loginUserSuccess, logoutUser } from '../ducks/auth/actions';
import { userSelector } from '../ducks/auth/selectors';

class App extends Component {
  static defaultProps = {
    user: null,
  }

  static propTypes = {
    user: PropTypes.object,
    loginUserAction: PropTypes.func.isRequired,
    logoutUserAction: PropTypes.func.isRequired,
  }

  state = {
    authChecked: false,
  }

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

  render() {
    const { user } = this.props;
    const { authChecked } = this.state;

    // If auth is not checked yet the show start screen
    if (!authChecked) {
      return <Start />;
    }

    // If user is not logged in show the login form
    if (!user) {
      return (
        <Router>
          <Switch>
            <Route exact path={urls.HOME} component={LoginForm} />
            <Route path={urls.LOGIN} component={LoginForm} />
            <Route path={urls.SIGNUP} component={SignupForm} />
            <Route component={NotFound} />
          </Switch>
        </Router>
      );
    }

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
  }
}

const mapStateToProps = state => ({
  user: userSelector(state),
});

const mapDispatchToProps = dispatch => ({
  loginUserAction: user => dispatch(loginUserSuccess(user)),
  logoutUserAction: () => dispatch(logoutUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
