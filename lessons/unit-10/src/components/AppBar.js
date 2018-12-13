import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Icon } from 'semantic-ui-react';

const menuStyle = {
  border: 'none',
  borderRadius: 0,
  marginTop: 0,
};

const AppBar = (props) => {
  const { showBack, title, onBackClicked } = props;

  return (
    <Menu borderless fixed="top" style={menuStyle}>
      {
        !showBack
        && (
          <Menu.Item>
            <Icon name="rocketchat" size="big" />
          </Menu.Item>
        )
      }
      {
        showBack
        && (
          <Menu.Item onClick={onBackClicked}>
            <Icon name="angle left" size="big" /> Back
          </Menu.Item>
        )
      }
      <Menu.Item><h3>{title}</h3></Menu.Item>
    </Menu>
  );
};

AppBar.defaultProps = {
  title: 'Babili',
  showBack: false,
  onBackClicked: () => {},
};

AppBar.propTypes = {
  title: PropTypes.string,
  showBack: PropTypes.bool,
  onBackClicked: PropTypes.func,
};

export default AppBar;
