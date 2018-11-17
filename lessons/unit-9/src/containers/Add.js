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

  }

  static propTypes = {
    history: PropTypes.object.isRequired,
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

    // TODO - Trigger action to store data.
  }

  render() {
    const { data, step, selectedImageData } = this.state;
    const fetching = false;
    const error = null;
    const errorMessage = null;

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

});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Add);
