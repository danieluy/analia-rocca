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

const populateCollections = (collections) => {
  const documents = firebase.database().ref('documents').orderByChild('collection');
  return Promise.all(collections
    .map((collection, i) => new Promise((resolve, reject) => {
      if (typeof firebase !== 'undefined')
        documents.equalTo(i)
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
};

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
  populateCollections,
  signInWithGogle,
  signOutOfGogle,
  getCurrentUser
};
