import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import debounce from 'lodash/debounce';
import Layout from './Layout';
import AppBar from '../components/AppBar';
import Timeline from '../components/Timeline';
import urls from '../urls';

import { loadSparksRequest, thumbsUpRequest } from '../ducks/data/actions';
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
    thumbsUp: PropTypes.func.isRequired,
  }

  loading = false

  hasMoreData = true

  offset = 0

  requestSparks = debounce(
    async (lastKey = null) => {
      const { loadSparks, fetching } = this.props;
      if (fetching) {
        return;
      }
      loadSparks({ lastKey });
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

  handleOnThumb = (spark) => {
    const { thumbsUp } = this.props;
    thumbsUp(spark.key);
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
          onThumbClick={this.handleOnThumb}
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
  loadSparks: lastKey => dispatch(loadSparksRequest(lastKey)),
  thumbsUp: key => dispatch(thumbsUpRequest(key)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
