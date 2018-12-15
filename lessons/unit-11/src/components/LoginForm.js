import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { isEmail, isLength } from 'validator';
import styled from 'styled-components';
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

class LoginForm extends PureComponent {
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
    email: '',
    password: '',
    hasFormValidValues: false,
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
    const { email, password } = this.state;
    this.setState({
      hasFormValidValues: {
        email: isEmail(email),
        password: isLength(password, { min: 6 }),
      },
    });
  }

  handleSubmit = () => {
    const { email, password } = this.state;
    const { onSubmit } = this.props;

    onSubmit(email, password);
  }

  render() {
    const { loading, errorMessage } = this.props;
    const { hasFormValidValues } = this.state;

    return (
      <Grid textAlign="center" style={{ height: '100%' }} verticalAlign="middle">
        <Grid.Column style={{ maxWidth: 300 }}>
          <Header as="h2" textAlign="center">
            <Icon name="rocketchat" />
            {' '}
            Babili
          </Header>

          <Form onSubmit={this.handleSubmit}>
            <Segment loading={loading}>
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
                disabled={!hasFormValidValues.email || !hasFormValidValues.password}
              >
                Login
              </Button>
            </Segment>
          </Form>

          { errorMessage && <Message negative>{errorMessage}</Message>}

          <Segment basic>
            New on Babili? <Link to={urls.SIGNUP}>Sign Up</Link>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}

export default LoginForm;
