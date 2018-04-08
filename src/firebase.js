/* global firebase */
import { handleBackendError } from './utils';

const firebaseUnavailable = {
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
      handleBackendError(firebaseUnavailable);
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
        handleBackendError(firebaseUnavailable);
    })));

export {
  getCollections,
  populateCollections
};
