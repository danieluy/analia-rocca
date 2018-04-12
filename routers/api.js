const express = require('express');
const router = express.Router();
const multer = require('multer');
const Photo = require('../models/Photo');
const { isAuthenticated } = require('./middleware');

router.get('/collections', isAuthenticated, (req, res) => {
  const { firebaseAdmin } = req.app.locals;
  const db = firebaseAdmin.database();
  db.ref('collections')
    .once(
      'value',
      (snapshot) => {
        const collections = snapshot.val();
        Promise.all(collections.map((collection, i) => new Promise((resolve, reject) => {
          db.ref('documents')
            .orderByChild('collection')
            .equalTo(i)
            .once(
              'value',
              (snapshot2) => {
                let photos = snapshot2.val();
                if (!Array.prototype.isPrototypeOf(photos))
                  photos = Object.entries(photos).map(photo => photo[1]); // when firebase collection has only one item
                resolve(Object.assign({}, collection, { photos }));
              },
              err => reject(err)
            );
        })))
          .then(populatedCollections => res.status(200).json(populatedCollections))
          .catch((err) => {
            console.error(err);
            res.status(500).json({ message: 'Error reading data' });
          });
      },
      (err) => {
        console.error(err);
        res.status(500).json({ message: 'Error reading data' });
      }
    );
});

// const populateCollections = collections =>
//   Promise.all(collections
//     .map((collection, i) => new Promise((resolve, reject) => {
//       if (typeof firebase !== 'undefined')
//         firebase.database().ref('documents')
//           .orderByChild('collection')
//           .equalTo(i)
//           .once(
//             'value',
//             (snapshot) => {
//               let photos = snapshot.val();
//               if (!Array.prototype.isPrototypeOf(photos))
//                 photos = Object.entries(photos).map(photo => photo[1]); // when firebase collection has only one item
//               resolve(Object.assign({}, collection, { photos }));
//             },
//             err => reject(err)
//           );
//       else
//         handleBackendError(FIREBASE_UNAVAILABLE);
//     })));


const collectionUpload = multer({ dest: 'public/photos/' });
router.post('/collection', isAuthenticated, collectionUpload.array('photo'), (req, res) => {
  req.body = JSON.parse(req.body.json);
  if (!req.body)
    return res.status(400).json({ message: 'Missing JSON data on body' });
  console.log(req.files.map(file => new Photo(file)));
  res.sendStatus(200);
});

module.exports = router;
