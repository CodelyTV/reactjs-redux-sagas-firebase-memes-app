import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import SignupFormRender from '../components/SignupForm';
import urls from '../urls';
import { newUserRequest } from '../ducks/auth/actions';

class SignupForm extends PureComponent {
  static defaultProps = {
    user: null,
    error: null,
  }

  static propTypes = {
    user: PropTypes.object,
    fetching: PropTypes.bool.isRequired,
    error: PropTypes.object,
    newUserAction: PropTypes.func.isRequired,
  }

  handleCreateUser = async (username, email, password) => {
    const { newUserAction } = this.props;
    newUserAction({ username, email, password });
  }

  render() {
    const { user, fetching, error } = this.props;
    const errorMessage = error && error.message;

    // If we are logged redirect to home
    if (user) {
      return <Redirect to={urls.HOME} />;
    }

    return (
      <SignupFormRender
        loading={fetching}
        errorMessage={errorMessage}
        onSubmit={this.handleCreateUser}
      />
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  fetching: state.auth.fetching,
  error: state.auth.error,
});

const mapDispatchToProps = dispatch => ({
  newUserAction: user => dispatch(newUserRequest(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);
