const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('./middleware');


router.get('/collections', isAuthenticated, (req, res) => {
  console.log(req.decoded);
  res.status(200).json({});
});

module.exports = router;
