const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  path: { type: String, required: true },
  parentId: { type: String, required: true },
  isFolder: Boolean,
});

module.exports = mongoose.model('Category', categorySchema);