const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
  },
  owner: {
    type: Object,
    required: true,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
  likes: {
    type: Object,
  },
});

module.exports = mongoose.model('Card', cardSchema);
