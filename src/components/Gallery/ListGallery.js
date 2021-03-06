import React from 'react';
// import PropTypes from 'prop-types';
import Carousel from './Carousel';
import Gallery from './Gallery';

class ListGallery extends Gallery {
  constructor() { super(); }
  render() {
    if (this.state.photos) {
      const { photos } = this.state;
      return (
        <div>
          {photos.map((photo, i) => (
            <div key={`galley-image-${i}`}>
              <button onClick={() => this.setState({ open: true, index: i })} >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  style={{ maxWidth: 200, maxHeight: 200 }}
                />
              </button>
              <br />
            </div>
          ))}
          {this.state.open &&
            <Carousel
              photos={photos}
              onClose={() => this.setState({ open: false })}
              index={this.state.index}
            />
          }
        </div>
      );
    }
    return <h4>Loading List Gallery...</h4>;
  }
}

export default ListGallery;
