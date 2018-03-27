import React from 'react';
import PropTypes from 'prop-types';
import Carousel from './Carousel';

class Gallery extends React.Component {
  constructor() {
    super();
    this.state = {
      open: false,
      index: 0
    };
  }
  render() {
    return (
      <div>
        {this.props.photos.map((photo, i) => (
          <button onClick={() => this.setState({ open: true, index: i })} >
            <img
              src={photo.src}
              alt=""
              style={{ maxWidth: 200, maxHeight: 200 }}
            />
          </button>
        ))}
        {this.state.open &&
          <Carousel
            photos={this.props.photos}
            onClose={() => this.setState({ open: false })}
            index={this.state.index}
          />
        }
      </div>
    );
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
