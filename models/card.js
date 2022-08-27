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
    type: mongoose.ObjectId,
    ref: 'user',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  likes: {
    type: [mongoose.ObjectId],
    ref: 'user',
  },
});

module.exports = mongoose.model('Card', cardSchema);
