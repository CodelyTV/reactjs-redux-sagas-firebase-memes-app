/* eslint-disable no-underscore-dangle, no-param-reassign */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'semantic-ui-react';
import { AutoSizer, Collection } from 'react-virtualized';
import styled from 'styled-components';

const SearchWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const CollectionWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const Cell = styled.img`
  border-radius: .25rem;
  object-fit: cover;
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

const COLUMN_COUNT = 2;
const GUTTER_SIZE = 5;

class Search extends Component {
  static defaultProps = {
    onTermChanged: () => {},
    onScroll: () => {},
    onImageSelected: () => {},
  }

  static propTypes = {
    data: PropTypes.array.isRequired,
    onTermChanged: PropTypes.func,
    onScroll: PropTypes.func,
    onImageSelected: PropTypes.func,
  }

  static noContentRenderer() {
    return <CenteredContend>No results <span role="img" aria-label="sad">😔</span></CenteredContend>;
  }

  constructor(props) {
    super(props);

    this.collection = React.createRef();

    this.columnYMap = [];

    this.state = {
      cellCount: props.data.length,
      columnWidth: 0,
    };
  }

  componentDidUpdate(prevProps) {
    const { data } = this.props;
    const diff = prevProps.data !== data;

    // If data changes we need to force updating the Collection
    if (diff) {
      this.columnYMap = [];
      this.collection.current.recomputeCellSizesAndPositions();
      this.setState({ // eslint-disable-line react/no-did-update-set-state
        cellCount: data.length,
        columnWidth: this.collection.current.props.width,
      });
    }
  }

  componentDidMount = () => {
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount = () => {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize = () => {
    const { data } = this.props;
    this.columnYMap = [];
    this.collection.current.recomputeCellSizesAndPositions();
    this.setState({
      cellCount: data.length,
      columnWidth: this.collection.current.props.width,
    });
  }

  handleTermChanged = (event, data) => {
    const { onTermChanged } = this.props;
    onTermChanged(data.value);
  }

  handleImageClick = (event) => {
    const { onImageSelected } = this.props;
    onImageSelected(event.target.dataset.index);
  }

  cellRenderer = ({
    index, key, style,
  }) => {
    const { data } = this.props;
    const datum = data[index % data.length];
    const preview = datum.images.preview_gif;
    return (
      <Cell
        key={key}
        style={style}
        src={preview.gif_url}
        data-index={index}
        onClick={this.handleImageClick}
      />
    );
  }

  cellSizeAndPositionGetter = ({ index }) => {
    const { data } = this.props;
    const { columnWidth } = this.state;
    const columnPosition = index % (COLUMN_COUNT || 1);
    const datum = data[index % data.length];

    // Poor man's Masonry layout; columns won't all line up equally with the bottom.
    const { images } = datum;
    const width = columnWidth / COLUMN_COUNT - GUTTER_SIZE;
    const scale = Math.floor(width / images.preview_gif.width) || 1;
    const height = images.preview_gif.height * scale;
    const x = columnPosition * (GUTTER_SIZE + width);
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
    if (clientHeight + scrollTop + 5 >= scrollHeight) {
      const { onScroll } = this.props;
      onScroll();
    }
  }

  render() {
    const { cellCount } = this.state;

    return (
      <SearchWrapper>
        <Input fluid icon="search" placeholder="Search..." onChange={this.handleTermChanged} />

        <CollectionWrapper>
          <AutoSizer>
            {({ height, width }) => (
              <Collection
                ref={this.collection}
                cellCount={cellCount}
                cellRenderer={this.cellRenderer}
                cellSizeAndPositionGetter={this.cellSizeAndPositionGetter}
                height={height}
                width={width}
                noContentRenderer={Search.noContentRenderer}
                onScroll={this.handleOnScroll}
              />
            )}
          </AutoSizer>
        </CollectionWrapper>
      </SearchWrapper>
    );
  }
}

export default Search;
