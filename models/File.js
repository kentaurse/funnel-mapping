const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  name: String,
  classify: String,
  parentId: String,
  isDirectory: Boolean,
  canvas: String,
});

module.exports = mongoose.model('File', fileSchema);