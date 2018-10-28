import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import SignupFormRender from '../components/SignupForm';
import firebase from '../services/firebase';
import urls from '../urls';
import { newUser } from '../ducks/auth/actions';

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
    const auth = firebase.auth();
    const userCredential = await auth.createUserWithEmailAndPassword(email, password);
    if (userCredential) {
      const { user } = userCredential;
      await user.updateProfile({ displayName: username });

      const { newUserAction } = this.props;
      newUserAction(user);
    }
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
  newUserAction: user => dispatch(newUser(user)), 
});

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);
