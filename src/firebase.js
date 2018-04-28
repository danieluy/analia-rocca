/* global firebase */
import { handleBackendError } from './utils';
import { verifyGoogleId } from './backend';
import events from './events';

const FIREBASE_UNAVAILABLE = {
  status: 400,
  response: {
    body: {
      message: 'The database is unavailabe.\nPlease try again later.'
    }
  }
};

const getCollections = () =>
  new Promise((resolve, reject) => {
    if (typeof firebase !== 'undefined')
      firebase.database().ref('collections').once(
        'value',
        snapshot => resolve(snapshot.val()),
        err => reject(err)
      );
    else
      handleBackendError(FIREBASE_UNAVAILABLE);
  });

const populateCollections = collections =>
  Promise.all(collections
    .map((collection, i) => new Promise((resolve, reject) => {
      if (typeof firebase !== 'undefined')
        firebase.database().ref('documents')
          .orderByChild('collection')
          .equalTo(i)
          .once(
            'value',
            (snapshot) => {
              let photos = snapshot.val();
              if (!Array.prototype.isPrototypeOf(photos))
                photos = Object.entries(photos).map(photo => photo[1]); // when firebase collection has only one item
              resolve(Object.assign({}, collection, { photos }));
            },
            err => reject(err)
          );
      else
        handleBackendError(FIREBASE_UNAVAILABLE);
    })));

firebase.auth().onAuthStateChanged(user => events.emit('FIREBASE_AUTH_STATE_CHANGED', user));

const signInWithGogle = () => {
  const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
  return firebase.auth().signInWithPopup(googleAuthProvider)
    .then(() => firebase.auth().currentUser.getIdToken(true))
    .then(idToken => verifyGoogleId(idToken))
    .then(jWToken => window.localStorage.setItem('AR_JWTOKEN', JSON.stringify(jWToken)))
    .catch(err => handleBackendError(err));
};

const signOutOfGogle = () => {
  firebase.auth().signOut()
    .then(() => {
      console.info('Signed Out');
      window.localStorage.removeItem('AR_JWTOKEN');
    }, (error) => {
      console.error('Sign Out Error', error);
    });
};

export {
  getCollections,
  populateCollections,
  signInWithGogle,
  signOutOfGogle
};
