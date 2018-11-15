import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Icon, Card, Label } from 'semantic-ui-react';

class TimelineCard extends PureComponent {
  static defaultProps = {
    onThumbClick: () => {},
  }

  static propTypes = {
    style: PropTypes.object.isRequired,
    spark: PropTypes.object.isRequired,
    onThumbClick: PropTypes.func,
  };

  handleOnThumb = () => {
    const { spark, onThumbClick } = this.props;
    onThumbClick(spark);
  }

  render() {
    const { spark, style } = this.props;

    const userNameNick = `@${spark.userName}`;
    const { url: imageUrl, title } = spark.data;
    const { timestamp, thumbsUp } = spark;

    return (
      <Card centered raised style={style}>
        <img alt="spark" src={imageUrl} style={{ width: '100%' }} />
        <Card.Content>
          <Card.Header>{title}</Card.Header>
          <Card.Meta>
            {new Date(timestamp).toLocaleString()}
          </Card.Meta>
          <Card.Description>
            by <em>{userNameNick}</em>
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Label as="a" onClick={this.handleOnThumb} style={{ float: 'right' }}>
            <Icon name="thumbs up" /> {thumbsUp || 0}
          </Label>
        </Card.Content>
      </Card>
    );
  }
}

export default TimelineCard;
