import React from 'react';
import PropTypes from 'prop-types';
import ListGallery from '../Gallery/ListGallery';
import Collection from './Collection';
import { translate } from '../../utils';

class CollectionList extends Collection {
  render() {
    const { title, documents } = this.props.collection;
    return (
      <div className="collection">
        <h2>{translate(title)}</h2>
        <ListGallery photos={documents} />
      </div>
    );
  }
}

export default CollectionList;

CollectionList.propTypes = {
  collection: PropTypes.shape({
    title: PropTypes.object,
    documents: PropTypes.arrayOf(PropTypes.object)
  }).isRequired
};
