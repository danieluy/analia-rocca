/* global firebase */

const getCollections = () =>
  new Promise((resolve, reject) => {
    firebase.database().ref('collections').once(
      'value',
      snapshot => resolve(snapshot.val()),
      err => reject(err)
    );
  });

const populateCollections = collections =>
  Promise.all(collections
    .map((collection, i) => new Promise((resolve, reject) => {
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
    })));

export {
  getCollections,
  populateCollections
};
