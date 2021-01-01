const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
  label: {
    type: String,
    required: true,
  },
  imageLink: {
    type: String,
    required: true,
  },
  imageFileName: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = Image = mongoose.model('images', ImageSchema);
