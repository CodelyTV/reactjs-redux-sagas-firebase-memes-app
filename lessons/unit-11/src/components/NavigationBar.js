import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Menu, Icon } from 'semantic-ui-react';
import urls from '../urls';

const menuStyle = {
  border: 'none',
  borderRadius: 0,
  marginTop: 0,
};

const itemStyle = {
  width: '33.33%',
  justifyContent: 'center',
  alignContent: 'center',
};

const ACTIONS = [
  { icon: 'home', url: urls.HOME },
  { icon: 'add', url: urls.ADD },
  { icon: 'user', url: urls.PROFILE },
];

class NavigationBar extends Component {
  static defaultProps = {
    section: urls.HOME,
    selected: ACTIONS[0].icon,
    onSectionChanged: () => {},
  }

  static propTypes = {
    section: PropTypes.string,
    selected: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
    onSectionChanged: PropTypes.func,
  }

  state = {
    selected: null,
  }

  handleClick = (event) => {
    const { onSectionChanged } = this.props;
    const { url } = event.currentTarget.dataset;

    this.setState({ selected: url });
    onSectionChanged(url);
  }

  render() {
    const { selected: selectState } = this.state;
    const { section } = this.props;
    const selected = selectState || section;

    return (
      <Menu borderless fixed="bottom" style={menuStyle}>
        {
          ACTIONS.map(item => (
            <Menu.Item
              key={item.icon}
              style={itemStyle}
              data-icon={item.icon}
              data-url={item.url}
              onClick={this.handleClick}
            >
              <Icon name={item.icon} size="large" color={selected === item.url ? 'teal' : 'black'} />
            </Menu.Item>
          ))
        }
      </Menu>
    );
  }
}

export default NavigationBar;
