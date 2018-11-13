import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import NavigationBar from './NavigationBar';

const LayerWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const Container = styled.div`
  position: fixed;
  width: 100%;
  top: 4em;
  bottom: ${props => props.bottom};
`;

class Layout extends PureComponent {
  static defaultProps = {
    section: null,
    children: null,
    onSectionChanged: () => {},
    navBar: true,
  }

  static propTypes = {
    section: PropTypes.string,
    children: PropTypes.any,
    onSectionChanged: PropTypes.func,
    navBar: PropTypes.bool,
  }

  render() {
    const {
      section, children, onSectionChanged, navBar,
    } = this.props;

    return (
      <LayerWrapper>
        <Container bottom={navBar ? '4em' : '0'}>
          { children }
        </Container>

        { navBar && <NavigationBar section={section} onSectionChanged={onSectionChanged} /> }
      </LayerWrapper>
    );
  }
}

export default Layout;
