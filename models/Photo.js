const Document = require('./Document');

class Photo extends Document {
  constructor(file) {
    super(file);
    this.src = file.path.slice(6);
    this.alt = { es: (file.title || '') };
  }
  getDocValues() {
    return Object.assign({}, super.getDocValues(), {
      src: this.src,
      alt: this.alt
    });
  }
}

module.exports = Photo;
