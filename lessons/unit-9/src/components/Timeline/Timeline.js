import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { AutoSizer, Collection } from 'react-virtualized';
import { Dimmer, Loader } from 'semantic-ui-react';
import styled from 'styled-components';
import Card from './Card';

const CollectionWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const CenteredContend = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1em;
`;

const GUTTER_SIZE = 10;

class Timeline extends PureComponent {
  static defaultProps = {
    loading: false,
    onScroll: () => {},
    onThumbClick: () => {},
  }

  static propTypes = {
    data: PropTypes.array.isRequired,
    loading: PropTypes.bool,
    onScroll: PropTypes.func,
    onThumbClick: PropTypes.func,
  }

  static noContentRenderer() {
    return <CenteredContend>No results <span role="img" aria-label="sad">😔</span></CenteredContend>;
  }

  constructor(props) {
    super(props);

    this.collection = React.createRef();
    this.columnYMap = [];
    this.prevScrollTop = 0;
  }

  componentDidUpdate(prevProps) {
    const { data } = this.props;
    const diff = prevProps.data !== data;

    // If data changes we need to force updating the Collection
    if (diff) {
      this.columnYMap = [];
      this.collection.current.recomputeCellSizesAndPositions();
    }
  }

  componentDidMount = () => {
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount = () => {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize = () => {
    this.columnYMap = [];
    this.collection.current.recomputeCellSizesAndPositions();
  }

  cellRenderer = ({ index, key, style }) => {
    const { data, onThumbClick } = this.props;
    const datum = data[index % data.length];

    return (
      <Card key={key} spark={datum} style={style} onThumbClick={onThumbClick} />
    );
  }

  cellSizeAndPositionGetter = ({ index }) => {
    const { data } = this.props;
    const columnCount = 1;
    const columnPosition = index % (columnCount || 1);
    const datum = data[index % data.length];
    const { clientWidth } = document.body;

    // Poor man's Masonry layout; columns won't all line up equally with the bottom.
    const width = clientWidth * 0.8;
    const scale = width / datum.data.width;
    const height = datum.data.height * scale + 150;
    const x = columnPosition * (GUTTER_SIZE + width) + (clientWidth - width) / 2;
    const y = this.columnYMap[columnPosition] || 10;

    this.columnYMap[columnPosition] = y + height + GUTTER_SIZE;

    const cellInfo = {
      height,
      width,
      x,
      y,
    };

    return cellInfo;
  }

  handleOnScroll = ({ clientHeight, scrollHeight, scrollTop }) => {
    const nearBottom = (clientHeight + scrollTop + 10) >= scrollHeight;
    const scrollingDown = scrollTop >= this.prevScrollTop;
    if (nearBottom && scrollingDown) {
      const { onScroll } = this.props;
      onScroll();
      this.prevScrollTop = scrollTop;
    }
  }

  render() {
    const { data, loading } = this.props;

    return (
      <CollectionWrapper>
        <AutoSizer>
          {({ height, width }) => (
            <Collection
              ref={this.collection}
              cellCount={data.length}
              cellRenderer={this.cellRenderer}
              cellSizeAndPositionGetter={this.cellSizeAndPositionGetter}
              height={height}
              width={width}
              noContentRenderer={Timeline.noContentRenderer}
              onScroll={this.handleOnScroll}
            />
          )}
        </AutoSizer>

        { loading && (
          <Dimmer active inverted>
            <Loader inverted>Loading</Loader>
          </Dimmer>
        )}
      </CollectionWrapper>
    );
  }
}

export default Timeline;
