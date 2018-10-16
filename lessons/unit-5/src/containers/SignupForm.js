import React, { PureComponent } from 'react';
import { Redirect } from 'react-router-dom';
import SignupFormRender from '../components/SignupForm';
import urls from '../urls';
import firebase from '../services/firebase';

class SignupForm extends PureComponent {
  state = {
    user: null,
    fetching: false,
    error: null,
  }

  handleCreateUser = async (username, email, password) => {
    this.setState({ fetching: true });
    try {
      const auth = firebase.auth();
      const userCredential = await auth.createUserWithEmailAndPassword(email, password);
      if (userCredential) {
        const { user } = userCredential;
        await user.updateProfile({ displayName: username });

        this.setState({
          user,
          fetching: false,
        });
      }
    } catch (error) {
      this.setState({
        fetching: false,
        error,
      });
    }
  }

  render() {
    const { user, fetching, error } = this.state;
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

export default SignupForm;
