const Document = require('./Document');

class Photo extends Document {
  constructor(file) {
    super(file);
    this.date = file.date;
    this.description = file.description;
    this.height = file.height;
    this.long = file.long;
    this.material = file.material;
    this.title = file.title;
    this.width = file.width;
    this.src = file.path.slice(7);
    this.alt = file.title;
  }
  getFieldValues() {
    return Object.assign(super.getFieldValues(), {
      date: this.date,
      description: this.description,
      height: this.height,
      long: this.long,
      material: this.material,
      title: this.title,
      width: this.width
    });
  }
}

module.exports = Photo;
