import React from 'react';
import PropTypes from 'prop-types';
import Gallery from '../Gallery/Gallery';

class Collection extends React.PureComponent {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    const { title, photos } = this.props.collection;
    return (
      <div className="collection">
        <h2>{title.es}</h2>
        <Gallery photos={photos} />
      </div>
    );
  }
}

export default Collection;

Collection.propTypes = {
  collection: PropTypes.shape({
    title: PropTypes.shape({
      es: PropTypes.string,
      en: PropTypes.string
    }),
    photos: PropTypes.arrayOf(PropTypes.shape({
      src: PropTypes.string
    }))
  }).isRequired
};
