const firebaseAdmin = require('../firebase');

class Model {
  constructor(file) {
    this.firebaseAdmin = firebaseAdmin;
    this.save = this.save.bind(this);
    this.getFieldValues = this.getFieldValues.bind(this);
    this.filename = file.filename;
    this.destination = file.destination;
    this.originalname = file.originalname;
    this.encoding = file.encoding;
    this.mimetype = file.mimetype;
    this.path = file.path;
    this.size = file.size;
  }
  save() {
    return new Promise((resolve, reject) => {
      const ref = this.firebaseAdmin.database().ref('documents');
      ref.once('value', (snapshot) => {
        const nextPos = snapshot.val().length;
        ref.update({ [`/${nextPos}`]: this.getFieldValues() })
          .then(() => resolve(this.getFieldValues()))
          .catch(err => reject(err));
      });
    });
  }
  getFieldValues() {
    return {
      filename: this.filename,
      destination: this.destination,
      originalname: this.originalname,
      encoding: this.encoding,
      mimetype: this.mimetype,
      path: this.path,
      size: this.size
    };
  }
  static saveMany(documents) {
    return new Promise((resolve, reject) => {
      const ref = firebaseAdmin.database().ref('documents');
      ref.once('value', (snapshot) => {
        const startPos = snapshot.val().length;
        const updates = documents.reduce((listOfUpdates, doc, i) => {
          const aux = Object.assign({}, listOfUpdates);
          aux[startPos + i] = doc.getFieldValues();
          return aux;
        }, {});
        ref.update(updates)
          .then(() => resolve())
          .catch(err => reject(err));
      });
    });
  }
}

module.exports = Model;
