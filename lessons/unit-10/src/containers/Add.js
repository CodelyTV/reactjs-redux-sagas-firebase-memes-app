import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Segment, Message, Modal, Icon,
} from 'semantic-ui-react';
import debounce from 'lodash/debounce';
import Layout from './Layout';
import AppBar from '../components/AppBar';
import Search from '../components/Add/Search';
import Comment from '../components/Add/Comment';
import { postSparkRequest } from '../ducks/data/actions';
import { fetchingSelector, errorSelector } from '../ducks/data/selectors';
import giphy from '../services/giphy';
import urls from '../urls';

const segmentStyle = {
  width: '100%',
  height: '100%',
  margin: 0,
  padding: 5,
};

class Add extends PureComponent {
  static defaultProps = {
    fetching: false,
    error: null,
  }

  static propTypes = {
    history: PropTypes.object.isRequired,
    postSpark: PropTypes.func.isRequired,
    fetching: PropTypes.bool,
    error: PropTypes.object,
  }

  loading = false

  hasMoreData = true

  currentTerm = null

  offset = 0

  state = {
    data: [],
    selectedImageData: null,
    step: 'search',
  }

  queryForImages = debounce(
    async (term = null) => {
      const { data } = this.state;
      const searchTerm = term || this.currentTerm;
      const isNewTerm = searchTerm !== this.currentTerm;

      if (isNewTerm) {
        this.hasMoreData = true;
      }

      if (this.loading || !this.hasMoreData || !searchTerm) {
        return;
      }

      this.loading = true;
      const response = await giphy.search(term, this.offset);
      const responseSize = response.data.length;

      this.setState({
        data: isNewTerm ? response.data : data.concat(response.data),
      }, () => {
        this.currentTerm = searchTerm;
        this.hasMoreData = responseSize > 0;
        this.offset = responseSize > 0 ? response.pagination.offset : 0;
        this.loading = false;
      });
    },
    250,
  ).bind(this);

  componentDidUpdate(prevProps, prevState) {
    const { step } = prevState;
    const { fetching, error, history } = this.props;

    // If meme is posting successfully redirect to home
    if (step === 'posting' && !error && !fetching) {
      this.setState({ step: 'posted' }); // eslint-disable-line react/no-did-update-set-state

      setTimeout(
        () => history.push(urls.HOME),
        1000,
      );
    }
  }

  handleBackClicked = () => {
    const { step } = this.state;
    const { history } = this.props;

    if (step === 'search') {
      history.goBack();
    } else {
      this.setState({ step: 'search' });
    }
  }

  handleTermChanged = term => term && this.queryForImages(term);

  handleOnScroll = () => this.queryForImages();

  handleImageSelected = (index) => {
    const { data } = this.state;
    const selectedImageData = data[index];

    this.setState({
      step: 'comment',
      selectedImageData,
    });
  }

  handleSubmit = (title) => {
    const { selectedImageData } = this.state;
    const { postSpark } = this.props;
    const data = {
      ...selectedImageData,
      title,
    };
    postSpark(data);

    this.setState({ step: 'posting' });
  }

  render() {
    const { data, step, selectedImageData } = this.state;
    const { fetching, error } = this.props;
    const errorMessage = error && error.message;

    return (
      <Layout section={urls.ADD} navBar={false}>
        <AppBar showBack title="Post" onBackClicked={this.handleBackClicked} />
        <Segment loading={fetching} basic style={segmentStyle}>
          {
            step === 'search'
            && (
              <Search
                onTermChanged={this.handleTermChanged}
                onImageSelected={this.handleImageSelected}
                onScroll={this.handleOnScroll}
                data={data}
              />
            )
          }
          {
            (step === 'comment' || step === 'posting' || step === 'posted') && (
              <Comment
                selectedImageData={selectedImageData}
                onSubmit={this.handleSubmit}
              />
            )
          }
          {
            step === 'posted'
            && (
              <Modal defaultOpen basic style={{ textAlign: 'center' }}>
                <Modal.Content>
                  <p><Icon name="check" size="big" color="teal" /></p>
                  <h4>Posted !</h4>
                </Modal.Content>
              </Modal>
            )
          }

          { error && <Message negative>{errorMessage}</Message> }
        </Segment>
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  fetching: fetchingSelector(state),
  error: errorSelector(state),
});

const mapDispatchToProps = dispatch => ({
  postSpark: data => dispatch(postSparkRequest(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Add);
