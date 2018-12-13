import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import LoginFormRender from '../components/LoginForm';
import urls from '../urls';
import { loginUserRequest } from '../ducks/auth/actions';
import { userSelector, fetchingSelector, errorSelector } from '../ducks/auth/selectors';

class LoginForm extends PureComponent {
  static defaultProps = {
    user: null,
    error: null,
  }

  static propTypes = {
    user: PropTypes.object,
    fetching: PropTypes.bool.isRequired,
    error: PropTypes.object,
    loginUserAction: PropTypes.func.isRequired,
  }

  handleLoginUser = (email, password) => {
    const { loginUserAction } = this.props;
    loginUserAction({ email, password });
  }

  render() {
    const { user, fetching, error } = this.props;
    const errorMessage = error && error.message;

    // If we are logged redirect to home
    if (user) {
      return <Redirect to={urls.HOME} />;
    }

    return (
      <LoginFormRender
        loading={fetching}
        errorMessage={errorMessage}
        onSubmit={this.handleLoginUser}
      />
    );
  }
}

const mapStateToProps = state => ({
  user: userSelector(state),
  fetching: fetchingSelector(state),
  error: errorSelector(state),
});

const mapDispatchToProps = dispatch => ({
  loginUserAction: payload => dispatch(loginUserRequest(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
