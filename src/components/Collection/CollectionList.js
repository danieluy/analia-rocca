import React from 'react';
import ListGallery from '../Gallery/ListGallery';
import Collection from './Collection';

class CollectionList extends Collection {
  render() {
    const { title, photos } = this.props.collection;
    return (
      <div className="collection">
        <h2>{title.es}</h2>
        <ListGallery photos={photos} />
      </div>
    );
  }
}

export default CollectionList;
