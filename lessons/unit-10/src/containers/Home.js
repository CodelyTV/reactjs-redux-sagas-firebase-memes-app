import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import debounce from 'lodash/debounce';
import Layout from './Layout';
import AppBar from '../components/AppBar';
import Timeline from '../components/Timeline';
import urls from '../urls';

// import { loadSparksRequest, thumbsUpRequest } from '../ducks/data/actions';
import { dataSelector, fetchingSelector, errorSelector } from '../ducks/data/selectors';

class Home extends PureComponent {
  static defaultProps = {
    data: [],
    error: null,
  }

  static propTypes = {
    data: PropTypes.array,
    fetching: PropTypes.bool.isRequired,
    error: PropTypes.object,
    loadSparks: PropTypes.func.isRequired,
  }

  loading = false

  hasMoreData = true

  offset = 0

  // Debounce the action to load memes to avoid triggering tons of requests
  requestSparks = debounce(
    () => {}, // This is the function that will load the memes
    250,
  ).bind(this);

  componentDidMount() {
    // Load memes when the component is mounted
    this.requestSparks();
  }

  handleScroll = () => {
    const { data } = this.props;
    const size = data.length;
    const lastKey = size && data[size - 1].key;

    // Load memes when we reach the bottom of the timeline
    this.requestSparks(lastKey);
  }

  render() {
    const { data, fetching, error } = this.props;

    return (
      <Layout section={urls.HOME}>
        <AppBar />

        <Timeline
          data={data}
          loading={fetching}
          error={error && error.message}
          onScroll={this.handleScroll}
        />
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  data: dataSelector(state),
  fetching: fetchingSelector(state),
  error: errorSelector(state),
});

const mapDispatchToProps = dispatch => ({
  // loadSparks: lastKey => dispatch(loadSparksRequest(lastKey)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
