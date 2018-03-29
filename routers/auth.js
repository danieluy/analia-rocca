const express = require('express');
const router = express.Router();
const config = require('../config/');
const jwt = require('jsonwebtoken');

router.get('/verifygoogleid/:idToken', (req, res) => {
  const { idToken } = req.params;
  if (!idToken)
    return res.status(400).json({ message: 'idToken is required' });
  req.app.locals.firebaseAdmin.auth().verifyIdToken(idToken)
    .then((decodedToken) => {
      const { uid } = decodedToken;
      const allowedUser = config.auth.allowedUsers.find(user => user.UID === uid);
      if (allowedUser) {
        const token = createToken({ name: allowedUser.name, email: allowedUser.email });
        return res.status(200).json({ token });
      }
      res.status(401).json({ message: 'Unauthorized user' });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: 'Authentication failed' });
    });
});

function createToken(payload) {
  const options = {};
  return jwt.sign(payload, config.auth.tokenSecret, options);
}

module.exports = router;
