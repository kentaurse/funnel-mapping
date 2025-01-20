const mongoose = require('mongoose');

const canvasSchema = new mongoose.Schema({
  node: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Node'
  }],
  edge: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Edge'
  }]
});

module.exports = mongoose.model('Canvas', canvasSchema);