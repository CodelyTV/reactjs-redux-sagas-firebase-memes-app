import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { isEmail, isLength } from 'validator';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {
  Button, Form, Grid, Header, Message, Segment, Icon,
} from 'semantic-ui-react';
import urls from '../urls';

const HelpMessage = styled.div`
  font-size: 0.8em;
  margin-top: -10px;
  margin-bottom: 10px;
  color: #ccc;
`;

class SignupForm extends PureComponent {
  static defaultProps = {
    loading: false,
    errorMessage: null,
    onSubmit: () => {},
  }

  static propTypes = {
    loading: PropTypes.bool,
    errorMessage: PropTypes.string,
    onSubmit: PropTypes.func,
  }

  state = {
    username: '',
    email: '',
    password: '',
    hasFormValidValues: {},
  }

  handleUsernameChanged = (event, data) => {
    const username = data.value.replace(/ /g, '');
    this.setState(
      { username },
      this.validateForm,
    );
  }

  handleEmailChanged = (event, data) => {
    this.setState(
      { email: data.value },
      this.validateForm,
    );
  }

  handlePasswordChanged = (event, data) => {
    this.setState(
      { password: data.value },
      this.validateForm,
    );
  }

  validateForm = () => {
    const { username, email, password } = this.state;
    this.setState({
      hasFormValidValues: {
        username: isLength(username, { min: 3 }),
        email: isEmail(email),
        password: isLength(password, { min: 6 }),
      },
    });
  }

  handleSubmit = () => {
    const { username, email, password } = this.state;
    const { onSubmit } = this.props;

    onSubmit(username, email, password);
  }

  render() {
    const { loading, errorMessage } = this.props;
    const { hasFormValidValues, username } = this.state;

    return (
      <Grid textAlign="center" style={{ height: '100%' }} verticalAlign="middle">
        <Grid.Column style={{ maxWidth: 300 }}>
          <Header as="h2" textAlign="center">
            <Icon name="rocketchat" />
            {' '}
            Dividi
          </Header>

          <Form onSubmit={this.handleSubmit}>
            <Segment loading={loading}>
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="User name"
                value={username}
                onChange={this.handleUsernameChanged}
                error={hasFormValidValues.username === false}
              />
              {
                hasFormValidValues.username === false
                && <HelpMessage>At least 3 chars. No white spaces allowed.</HelpMessage>
              }

              <Form.Input
                fluid
                icon="mail"
                iconPosition="left"
                placeholder="E-mail"
                onChange={this.handleEmailChanged}
                error={hasFormValidValues.email === false}
              />

              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
                onChange={this.handlePasswordChanged}
                error={hasFormValidValues.password === false}
              />
              {
                hasFormValidValues.password === false
                && <HelpMessage>At least 6 chars.</HelpMessage>
              }

              <Button
                primary
                fluid
                disabled={
                  !hasFormValidValues.username
                  || !hasFormValidValues.email
                  || !hasFormValidValues.password
                }
              >
                Signup
              </Button>
            </Segment>
          </Form>

          { errorMessage && <Message negative>{errorMessage}</Message>}

          <Segment basic>
            Already have an account? <Link to={urls.HOME}>Login</Link>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}

export default SignupForm;
