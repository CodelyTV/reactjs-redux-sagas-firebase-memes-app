import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import LayoutRender from '../components/Layout';

class Layout extends PureComponent {
  static defaultProps = {
    navBar: true,
  }

  static propTypes = {
    section: PropTypes.string.isRequired,
    history: PropTypes.object.isRequired,
    children: PropTypes.any.isRequired,
    navBar: PropTypes.bool,
  }

  handleSectionChanged = (section) => {
    const { history } = this.props;
    history.push(section);
  }

  render() {
    const { section, children, navBar } = this.props;

    return (
      <LayoutRender
        navBar={navBar}
        section={section}
        onSectionChanged={this.handleSectionChanged}
      >
        {children}
      </LayoutRender>
    );
  }
}

export default withRouter(Layout);
