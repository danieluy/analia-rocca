import React from 'react';
import ListGallery from '../Gallery/ListGallery';
import Collection from './Collection';
import { translate } from '../../utils';

class CollectionList extends Collection {
  render() {
    const { title, documents } = this.props.collection;
    return (
      <div className="collection">
        <h2>{translate(title.es)}</h2>
        <ListGallery photos={documents} />
      </div>
    );
  }
}

export default CollectionList;
