const config = require('../config/');
const jwt = require('jsonwebtoken');

const isAuthenticated = (req, res, next) => {
  if (!req.token)
    return res.status(401).json({ message: 'Unauthenticated user' });
  jwt.verify(req.token, config.auth.tokenSecret, (err, decoded) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Failed to authenticate token.' });
    }
    const allowedName = config.auth.allowedUsers.find(user => user.name === decoded.name);
    const allowedEmail = config.auth.allowedUsers.find(user => user.email === decoded.email);
    if (!allowedName || !allowedEmail)
      return res.status(401).json({ message: 'Unauthorized user.' });
    req.decoded = decoded;
    next();
  });
};

module.exports = {
  isAuthenticated
};
