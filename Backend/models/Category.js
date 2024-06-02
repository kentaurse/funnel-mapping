const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  icon: { type: String, default: '' },
});

module.exports = mongoose.model('Category', categorySchema);