const firebaseAdmin = require('../firebase');

class Model {
  constructor() {
    this.firebaseAdmin = firebaseAdmin;
  }
}

module.exports = Model;
