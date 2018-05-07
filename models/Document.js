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
    // TODO fix a gub where the last place gets replaced because the next save starts bejore firebase updates
    return new Promise((resolve, reject) => {
      const ref = this.firebaseAdmin.database().ref('documents');
      ref.once('value', (snapshot) => {
        const nextPos = snapshot.val().length;
        ref.update({ [`/${nextPos}`]: this.getFieldValues() })
          .then(() => resolve())
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
}

module.exports = Model;
