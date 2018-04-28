import React from 'react';
// import PropTypes from 'prop-types';
import { getCollections } from '../../backend';
import Container from '../Container/Container';
import CollectionList from '../Collection/CollectionList';
import InputDocument from '../InputDocument/InputDocument';
import { handleBackendError } from '../../utils';
import * as firebase from '../../firebase';
import events from '../../events';

class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      user: null,
      collections: null,
      addDocumentOpen: false
    };
    this.getCollectionsFromBackend = this.getCollectionsFromBackend.bind(this);
  }
  componentDidMount() {
    events.on('FIREBASE_AUTH_STATE_CHANGED', (user) => {
      this.setState({ user }, () => {
        if (!user)
          window.localStorage.removeItem('AR_JWTOKEN');
      });
    });
    this.getCollectionsFromBackend();
  }
  getCollectionsFromBackend() {
    getCollections()
      .then(collections => this.setState({ collections }))
      .catch(err => handleBackendError(err));
  }
  render() {
    if (this.state.user) {
      const { addDocumentOpen } = this.state;
      return (
        <Container>
          <h1>Dashboard</h1>
          {!addDocumentOpen
            ? <button className="button" onClick={() => this.setState({ addDocumentOpen: true })}>Add Documents</button>
            : <InputDocument done={() => this.setState({ addDocumentOpen: false })} />
          }
          <h2>Collections</h2>
          {this.state.collections
            ? this.state.collections.map(collection => (
              <CollectionList
                key={`collection-list-${collection.title.es}`}
                collection={collection}
              />
            ))
            : <h4>Loading...</h4>
          }

        </Container>
      );
    }
    return (
      <Container>
        <button className="sign-in-button" onClick={firebase.signInWithGogle}>Sign In With Google</button>
      </Container>
    );
  }
}

export default Dashboard;
