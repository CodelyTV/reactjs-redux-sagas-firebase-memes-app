import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Segment, Message, Modal, Icon,
} from 'semantic-ui-react';
import Layout from './Layout';
import AppBar from '../components/AppBar';
import Search from '../components/Add/Search';
import Comment from '../components/Add/Comment';

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

  handleBackClicked = () => {
    console.log('Add > handleBackClicked');
  }

  handleTermChanged = (term) => {
    console.log('Add > handleTermChanged');
  };

  handleOnScroll = () => {
    console.log('Add > handleOnScroll');
  };

  handleImageSelected = (index) => {
    console.log('Add > handleImageSelected');
  }

  handleSubmit = (title) => {
    console.log('Add > handleSubmit');
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
