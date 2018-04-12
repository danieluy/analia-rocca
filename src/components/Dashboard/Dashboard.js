/* global firebase */
import React from 'react';
// import PropTypes from 'prop-types';
import { verifyGoogleId, getCollections } from '../../backend';
import Container from '../Container/Container';
import CollectionList from '../Collection/CollectionList';
import { handleBackendError } from '../../utils';
import InputCollection from '../InputCollection/InputCollection';

class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      user: null,
      collections: null
    };
    this.signInWithGogle = this.signInWithGogle.bind(this);
    this.listenForAuthStateChanges = this.listenForAuthStateChanges.bind(this);
    this.signOutOfGogle = this.signOutOfGogle.bind(this);
    this.getCollectionsFromBackend = this.getCollectionsFromBackend.bind(this);
  }
  componentDidMount() {
    this.listenForAuthStateChanges();
    this.getCollectionsFromBackend();
  }
  listenForAuthStateChanges() {
    firebase.auth().onAuthStateChanged((user) => {
      this.setState({ user }, () => {
        if (!user)
          window.localStorage.removeItem('AR_JWTOKEN');
      });
    });
  }
  getCollectionsFromBackend() {
    getCollections()
      .then(collections => this.setState({ collections }))
      .catch(err => handleBackendError(err));
  }
  signInWithGogle() {
    const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(googleAuthProvider)
      .then(data => this.verifyGoogleIdToken())
      .catch(err => console.error(err));
  }
  signOutOfGogle() {
    firebase.auth().signOut()
      .then(() => {
        console.log('Signed Out');
        window.localStorage.removeItem('AR_JWTOKEN');
      }, (error) => {
        console.error('Sign Out Error', error);
      });
  }
  verifyGoogleIdToken() {
    firebase.auth().currentUser.getIdToken(true)
      .then(idToken => verifyGoogleId(idToken))
      .then(jWToken => window.localStorage.setItem('AR_JWTOKEN', JSON.stringify(jWToken)))
      .catch(err => handleBackendError(err));
  }
  render() {
    if (this.state.user) {
      console.log('this.state.collections', this.state.collections);
      return (
        <Container>
          <h1>Dashboard</h1>
          <button onClick={this.signOutOfGogle}>Sign Out Of Google</button>
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
          <InputCollection />
        </Container>
      );
    }
    return (
      <Container>
        <button onClick={this.signInWithGogle}>Sign In With Google</button>
      </Container>
    );
  }
}

export default Dashboard;
