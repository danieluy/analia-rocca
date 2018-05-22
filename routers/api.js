const express = require('express');
const router = express.Router();
const multer = require('multer');
const Photo = require('../models/Photo');
const Document = require('../models/Document');
const { isAuthenticated } = require('./middleware');

router.get('/collections', isAuthenticated, (req, res) => {
  const { firebaseAdmin } = req.app.locals;
  const db = firebaseAdmin.database();
  db.ref('collections')
    .once(
      'value',
      (snapshot) => {
        const collections = snapshot.val();
        Promise.all(collections.map(collection => promiseCollection(collection, db)))
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

function promiseCollection(collection, db) {
  return new Promise((resolve, reject) =>
    Promise.all(collection.documents.map(docKey => promiseDocument(docKey, db)))
      .then(documents => resolve(Object.assign({}, collection, { documents })))
      .catch(err => reject(err)));
}


function promiseDocument(docKey, db) {
  return new Promise((resolve, reject) =>
    db.ref(`documents/${docKey}`)
      .once(
        'value',
        snapshot => resolve(snapshot.val()),
        err => reject(err)
      ));
}

const documentsUpload = multer({ dest: 'public/img/' });
router.post('/documents', isAuthenticated, documentsUpload.array('photo'), (req, res) => {
  if (!req.body || !req.body.json)
    return res.status(400).json({ message: 'Missing JSON data on body' });
  try {
    req.body.json = JSON.parse(req.body.json);
  }
  catch (error) {
    return res.status(400).json({ message: 'Incorrect JSON data on body' });
  }
  const documents = req.files
    .map((file, i) => {
      switch (file.mimetype.split('/')[0]) {
        case 'image':
          return new Photo(Object.assign(file, req.body.json[i]));
        default:
          return null;
      }
    })
    .filter(doc => !!doc);
  Document.saveMany(documents)
    .then(() => res.status(200).json(documents.map(doc => doc.getFieldValues())))
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: 'Unable to save documents to Firebase' });
    });
});

module.exports = router;
