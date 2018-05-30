const firebaseAdmin = require('../firebase');

class Model {
  constructor(file) {
    this.firebaseAdmin = firebaseAdmin;

    this.filename = file.filename;
    this.destination = file.destination;
    this.originalname = file.originalname;
    this.encoding = file.encoding;
    this.mimetype = file.mimetype;
    this.extension = file.extension;
    this.path = file.path;
    this.size = file.size;
    this.date = file.date || new Date();
    this.description = { es: (file.description || '') };
    this.height = file.height || '';
    this.long = file.long || '';
    this.title = { es: (file.title || '') };
    this.width = file.width || '';
    this.weight = file.weight || '';
    this.materials = file.materials || [''];

    this.save = this.save.bind(this);
    this.getDocValues = this.getDocValues.bind(this);
  }
  save() {
    return new Promise((resolve, reject) => {
      const ref = this.firebaseAdmin.database().ref('documents');
      ref.once('value', (snapshot) => {
        const nextPos = snapshot.val().length;
        ref.update({ [`/${nextPos}`]: this.getDocValues() })
          .then(() => resolve(this.getDocValues()))
          .catch(err => reject(err));
      });
    });
  }
  getDocValues() {
    return {
      filename: this.filename,
      destination: this.destination,
      originalname: this.originalname,
      encoding: this.encoding,
      mimetype: this.mimetype,
      extension: this.extension,
      path: this.path,
      size: this.size,
      date: this.date,
      description: this.description,
      height: this.height,
      long: this.long,
      width: this.width,
      weight: this.weight,
      materials: this.materials,
      title: this.title
    };
  }
  static saveMany(documents) {
    return new Promise((resolve, reject) => {
      const ref = firebaseAdmin.database().ref('documents');
      ref.once('value', (snapshot) => {
        const value = snapshot.val();
        const startPos = value ? value.length : 0;
        const updates = documents.reduce((listOfUpdates, doc, i) => {
          const aux = Object.assign({}, listOfUpdates);
          aux[startPos + i] = doc.getDocValues();
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
