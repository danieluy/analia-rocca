import React from 'react';
import PropTypes from 'prop-types';
import Carousel from './Carousel';

class Gallery extends React.Component {
  constructor() {
    super();
    this.state = {
      open: false,
      index: 0,
      photos: null
    };
    this.findImagesDimensions = this.findImagesDimensions.bind(this);
  }
  componentWillMount() {
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
  render() {
    if (this.state.photos)
      return (
        <div>
          {this.state.photos.map((photo, i) => (
            <button key={`galley-image-${i}`} onClick={() => this.setState({ open: true, index: i })} >
              <img
                src={photo.src}
                alt={photo.alt}
                style={{ maxWidth: 200, maxHeight: 200 }}
              />
            </button>
          ))}
          {this.state.open &&
            <Carousel
              photos={this.state.photos}
              onClose={() => this.setState({ open: false })}
              index={this.state.index}
            />
          }
        </div>
      );
    return <h4>Loading...</h4>;
  }
}

export default Gallery;

Gallery.propTypes = {
  photos: PropTypes.arrayOf(PropTypes.shape({
    src: PropTypes.string,
    w: PropTypes.number,
    h: PropTypes.number
  })).isRequired
};
