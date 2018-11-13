import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  Input, Image, Button, Container,
} from 'semantic-ui-react';

const CenteredBottomContainer = styled.div`
  position: fixed;
  width: 100%;
  text-align: center;
  bottom: 1em;
`;

class Comment extends PureComponent {
  static defaultProps = {
    onSubmit: () => {},
  }

  static propTypes = {
    selectedImageData: PropTypes.object.isRequired,
    onSubmit: PropTypes.func,
  }

  state = {
    comment: null,
  }

  constructor(props) {
    super(props);

    this.input = React.createRef();
  }

  handleCommentChanged = (event, data) => {
    this.setState({ comment: data.value });
  }

  handleSubmit = () => {
    const { onSubmit, selectedImageData } = this.props;
    const { comment } = this.state;

    onSubmit(comment || selectedImageData.title);
  }

  render() {
    const { selectedImageData } = this.props;

    return (
      <div>
        <Container textAlign="center">
          <Image src={selectedImageData.images.fixed_width.gif_url} style={{ display: 'inline', width: '100%' }} />
        </Container>

        <h4>Comment:</h4>
        <Input
          ref={this.input}
          fluid
          icon="search"
          placeholder={selectedImageData.title}
          onChange={this.handleCommentChanged}
        />

        <CenteredBottomContainer>
          <Button color="teal" onClick={this.handleSubmit}>Post</Button>
        </CenteredBottomContainer>
      </div>
    );
  }
}

export default Comment;
