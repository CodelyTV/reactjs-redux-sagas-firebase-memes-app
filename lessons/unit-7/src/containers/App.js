import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Home from './Home';
import SignupForm from './SignupForm';
import NotFound from '../components/NotFound';
import urls from '../urls';
import AuthService from '../services/AuthService';
import Start from '../components/Start';
import { loginUserSuccess, logoutUser } from '../ducks/auth/actions';
import { userSelector } from '../ducks/auth/selectors';

class App extends Component {
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
    const { authChecked } = this.state;

    if (!authChecked) {
      return <Start />;
    }

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path={urls.HOME} component={Home} />
          <Route path={urls.SIGNUP} component={SignupForm} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  loginUserAction: PropTypes.func.isRequired,
  logoutUserAction: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  user: userSelector(state),
});

const mapDispatchToProps = dispatch => ({
  loginUserAction: user => dispatch(loginUserSuccess(user)),
  logoutUserAction: () => dispatch(logoutUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
