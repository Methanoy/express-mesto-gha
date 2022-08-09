const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlegth: 2,
    maxlegth: 30,
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
});

module.exports = mongoose.model('card', cardSchema);
