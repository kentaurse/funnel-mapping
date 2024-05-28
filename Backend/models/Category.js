const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  path: { type: String, required: true },
  icon: String,
  parentId: String,
  isParrent: Boolean,
});

module.exports = mongoose.model('Category', categorySchema);