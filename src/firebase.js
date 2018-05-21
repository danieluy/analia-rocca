/* global firebase */
import { handleBackendError, errorCodes } from './utils';
import { verifyGoogleId } from './backend';
import events from './events';

const getCollections = () =>
  new Promise((resolve, reject) => {
    if (typeof firebase !== 'undefined')
      firebase.database().ref('collections').once(
        'value',
        snapshot => resolve(snapshot.val()),
        err => reject(err)
      );
    else
      handleBackendError(errorCodes.FIREBASE_UNAVAILABLE);
  });

const populateDocuments = collections =>
  Promise.all(collections.map(collection => promiseCollection(collection)));

function promiseCollection(collection) {
  return new Promise((resolve, reject) =>
    Promise.all(collection.documents.map(docKey => promiseDocument(docKey)))
      .then(documents => resolve(Object.assign({}, collection, { documents })))
      .catch(err => reject(err)));
}

function promiseDocument(docKey) {
  return new Promise((resolve, reject) =>
    firebase.database()
      .ref(`documents/${docKey}`)
      .once(
        'value',
        snapshot => resolve(snapshot.val()),
        err => reject(err)
      ));
}

const getCurrentUser = () => firebase.auth().currentUser;
firebase.auth().onAuthStateChanged((user) => {
  if (!user)
    window.localStorage.removeItem('AR_JWTOKEN');
  events.emit('AUTH_STATE_CHANGED', user);
});

const signInWithGogle = () => {
  const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(googleAuthProvider)
    .then(() => firebase.auth().currentUser.getIdToken(true))
    .then(idToken => verifyGoogleId(idToken))
    .then((jWToken) => {
      window.localStorage.setItem('AR_JWTOKEN', JSON.stringify(jWToken));
      events.emit('AUTH_STATE_CHANGED', firebase.auth().currentUser);
    })
    .catch(err => handleBackendError(err));
};

const signOutOfGogle = () => {
  firebase.auth().signOut()
    .then(() => {
      console.info('Signed Out');
      window.localStorage.removeItem('AR_JWTOKEN');
      events.emit('AUTH_STATE_CHANGED', null);
    }, (error) => {
      console.error('Sign Out Error:', error);
    });
};

export {
  getCollections,
  populateDocuments,
  signInWithGogle,
  signOutOfGogle,
  getCurrentUser
};
