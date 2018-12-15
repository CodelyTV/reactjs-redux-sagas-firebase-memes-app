import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import debounce from 'lodash/debounce';
import styled from 'styled-components';
import Layout from './Layout';
import AppBar from '../components/AppBar';
import ProfileSummary from '../components/ProfileSummary';
import Timeline from '../components/Timeline';
import urls from '../urls';

import { logoutUser } from '../ducks/auth/actions';
import { loadSparksRequest } from '../ducks/data/actions';

import { userSelector } from '../ducks/auth/selectors';
import { dataSelector, fetchingSelector, errorSelector } from '../ducks/data/selectors';

const TimelineWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  padding-bottom: 10.1em;
`;

class Profile extends PureComponent {
  static defaultProps = {
    user: null,
    data: [],
    error: null,
  }

  static propTypes = {
    user: PropTypes.object,
    data: PropTypes.array,
    fetching: PropTypes.bool.isRequired,
    error: PropTypes.object,
    loadSparks: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
  }

  loading = false

  hasMoreData = true

  offset = 0

  requestSparks = debounce(
    async (lastKey = null) => {
      const { user, loadSparks, fetching } = this.props;
      if (fetching) {
        return;
      }

      loadSparks({ uid: user.uid, lastKey });
    },
    250,
  ).bind(this);

  componentDidMount() {
    this.requestSparks();
  }

  handleScroll = () => {
    const { data } = this.props;
    const size = data.length;
    const lastKey = size && data[size - 1].key;

    this.requestSparks(lastKey);
  }

  handleLogout = () => {
    const { logout, history } = this.props;
    logout();
    history.push(urls.HOME);
  }

  render() {
    const {
      user, data, fetching, error,
    } = this.props;

    return (
      <Layout section={urls.PROFILE}>
        <AppBar title="Profile" />

        <ProfileSummary
          userInfo={user}
          onLogout={this.handleLogout}
        />

        <TimelineWrapper>
          <Timeline
            data={data}
            loading={fetching}
            error={error && error.message}
            onScroll={this.handleScroll}
          />
        </TimelineWrapper>
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  user: userSelector(state),
  data: dataSelector(state),
  fetching: fetchingSelector(state),
  error: errorSelector(state),
});

const mapDispatchToProps = dispatch => ({
  loadSparks: ({ uid, lastKey }) => dispatch(loadSparksRequest({ uid, lastKey })),
  logout: () => dispatch(logoutUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
