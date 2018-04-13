const firebaseAdmin = require('../firebase');

class Model {
  constructor() {
    this.firebaseAdmin = firebaseAdmin;
    this.save = this.save.bind(this);
    this.getFieldValues = this.getFieldValues.bind(this);
  }
  save(dbField) {
    this.firebaseAdmin.database().ref('docuemnts/').set(Object.assign({}, this.getFieldValues()));
  }
  getFieldValues() {
    return null;
  }
}

module.exports = Model;
