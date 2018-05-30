import React from 'react';
import PropTypes from 'prop-types';
import Carousel from './Carousel';
import ThumbCard from './ThumbCard';
import isEqual from 'lodash/isEqual';

class Gallery extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      open: false,
      index: 0,
      photos: null
    };
    this.findImagesDimensions = this.findImagesDimensions.bind(this);
    this.initializePhotosState = this.initializePhotosState.bind(this);
    this.fillRows = this.fillRows.bind(this);
    this.getThumbWidth = this.getThumbWidth.bind(this);
  }
  componentDidMount() {
    this.initializePhotosState();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (!isEqual(prevProps.photos, this.props.photos))
      this.initializePhotosState();
  }
  initializePhotosState() {
    this.findImagesDimensions()
      .then(photos => this.setState({ photos }))
      .catch(err => console.error(err));
  }
  findImagesDimensions() {
    return Promise.all(this.props.photos
      .map(photo => new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          resolve(Object.assign({}, photo, { w: img.width, h: img.height }));
        };
        img.src = photo.src;
      }))
      .filter(photo => !!photo));
  }
  fillRows() {
    const dummyThumbs = [];
    for (let i = 0; i < this.state.photos.length % 4; i++)
      dummyThumbs.push(<div key={`dummy-${i}`} style={{ width: this.getThumbWidth() }} />);
    return dummyThumbs;
  }
  getThumbWidth() {
    return (1200 - 45) / 4;
  }
  render() {
    if (this.state.photos)
      return (
        <div className="gallery">
          <div className="thumbnails">
            {this.state.photos.map((photo, i) => (
              <ThumbCard
                key={`galley-image-${i}`}
                onClick={() => this.setState({ open: true, index: i })}
                photo={photo}
                width={this.getThumbWidth()}
              />
            ))}
            {this.fillRows()}
          </div>
          {this.state.open &&
            <Carousel
              photos={this.state.photos}
              onClose={() => this.setState({ open: false })}
              index={this.state.index}
            />
          }
        </div>
      );
    return <h4>Loading Gallery...</h4>;
  }
}

export default Gallery;

Gallery.propTypes = {
  photos: PropTypes.arrayOf(PropTypes.shape({
    src: PropTypes.string
  })).isRequired
};
