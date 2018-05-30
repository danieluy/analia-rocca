import React from 'react';
// import PropTypes from 'prop-types';
import Container from '../../Container/Container';
import CollectionList from '../../Collection/CollectionList';
import { getCollections } from '../../../backend';
import { handleBackendError } from '../../../utils';
import events from '../../../events';

class Collections extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      collections: null
    };
    this.getCollectionsFromBackend = this.getCollectionsFromBackend.bind(this);
  }
  componentDidMount() {
    this.getCollectionsFromBackend();
    events.on('AUTH_STATE_CHANGED', this.getCollectionsFromBackend);
  }
  componentWillUnmount() {
    events.off('AUTH_STATE_CHANGED', this.getCollectionsFromBackend);
  }
  getCollectionsFromBackend() {
    getCollections()
      .then(collections => this.setState({ collections }))
      .catch(err => handleBackendError(err));
  }
  render() {
    const { collections } = this.state;
    return (
      <Container>
        {collections
          ? collections.map((collection, i) => {
            console.log(i, collection);
            return (
              <CollectionList
                key={`collection-list-${i}`}
                collection={collection}
              />
            )
          })
          : <h4>Cargando Colecciones...</h4>
        }
      </Container>
    );
  }
}

export default Collections;
