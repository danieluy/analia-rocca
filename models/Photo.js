const Model = require('./Model');

class Photo extends Model {
  constructor(file) {
    super();
    this.filename = file.filename;
    this.destination = file.destination;
    this.originalname = file.originalname;
    this.encoding = file.encoding;
    this.mimetype = file.mimetype;
    this.path = file.path;
    this.size = file.size;
  }
}

module.exports = Photo;
