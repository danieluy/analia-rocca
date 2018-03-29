const config = require('../config/');
const jwt = require('jsonwebtoken');

const isAuthenticated = (req, res, next) => {
  if (!req.token)
    return res.status(401).json({ message: 'Unauthenticated user' });
  jwt.verify(req.token, config.auth.tokenSecret, (err, decoded) => {
    if (err)
      return res.status(500).json({ message: 'Failed to authenticate token.' });
    req.decoded = decoded;
    next();
  });
};

module.exports = {
  isAuthenticated
};
