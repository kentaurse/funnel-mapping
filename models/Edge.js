const mongoose = require('mongoose');

const edgeSchema = new mongoose.Schema({
  type: String,
  data: {
    header: String,
    image: String,
    color: String,
    point: [{
      type: mongoose.Schema.ObjectId,
      ref: 'Point'
    }]
  },
  position: {
    x: Number,
    y: Number
  },
});

module.exports = mongoose.model('Edge', edgeSchema);