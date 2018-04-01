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
      snapshot => res.status(200).json(snapshot.val().filter(collection => !!collection)),
      (err) => {
        console.error(err);
        res.status(500).json({ message: 'Error reading data' });
      }
    );
});


const collectionUpload = multer({ dest: 'public/photos/' });
router.post('/collection', isAuthenticated, collectionUpload.array('photo'), (req, res) => {
  req.body = JSON.parse(req.body.json);
  if (!req.body)
    return res.status(400).json({ message: 'Missing JSON data on body' });
  console.log(req.files.map(file => new Photo(file)));
  res.sendStatus(200);
});

module.exports = router;
