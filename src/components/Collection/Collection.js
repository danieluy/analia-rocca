import React from 'react';
import PropTypes from 'prop-types';
import Gallery from '../Gallery/Gallery';
import { translate } from '../../utils';

class Collection extends React.PureComponent {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    const { title, documents } = this.props.collection;
    return (
      <div className="collection">
        <h2>{translate(title)}</h2>
        <Gallery photos={documents} />
      </div>
    );
  }
}

export default Collection;

Collection.propTypes = {
  collection: PropTypes.shape({
    title: PropTypes.object,
    documents: PropTypes.arrayOf(PropTypes.object)
  }).isRequired
};
