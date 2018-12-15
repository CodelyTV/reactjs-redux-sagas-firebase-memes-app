import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Icon } from 'semantic-ui-react';

const Container = styled.div`
  padding: 10px;
  text-align: center;
  box-shadow: 0 1px 2px 0 #ccc;
`;

const UserName = styled.h3`
  margin: 0.2em;
`;

const Email = styled.div`
  color: #ccc;
  font-size: 0.8em;
`;

class ProfileSummary extends PureComponent {
  static defaultProps = {
    onLogout: () => {},
  }

  static propTypes = {
    userInfo: PropTypes.object.isRequired,
    onLogout: PropTypes.func,
  };

  handleLogout = (event) => {
    event.preventDefault();
    const { onLogout } = this.props;
    onLogout();
  }

  render() {
    const { userInfo } = this.props;

    return (
      <Container>
        <Icon name="user" size="huge" />
        <UserName>{userInfo.displayName}</UserName>
        <Email>{userInfo.email}</Email>

        <a href="/" onClick={this.handleLogout}>Logout</a>
      </Container>
    );
  }
}

export default ProfileSummary;
