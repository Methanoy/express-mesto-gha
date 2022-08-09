const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlegth: 2,
    maxlegth: 30,
  },
  about: {
    type: String,
    required: true,
    minlegth: 2,
    maxlegth: 30,
  },
  avatar: {
    type: String,
    required: true,
    minlegth: 2,
    maxlegth: 30,
  },
});

module.exports = mongoose.model('user', userSchema);
