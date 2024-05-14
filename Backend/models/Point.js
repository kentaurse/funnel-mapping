const mongoose = require('mongoose');

const pointSchema = new mongoose.Schema({
  name: String,
  color: String,
  category: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Category'
  }]
});

module.exports = mongoose.model('Point', pointSchema);