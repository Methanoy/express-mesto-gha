const mongoose = require('mongoose');
const validator = require('validator');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Поле "Название" является обязательным для заполнения'],
    minlength: [2, 'Поле "Название" должно содержать не менее 2 символов'],
    maxlength: [30, 'Поле "Название" должно содержать не более 30 символов'],
  },
  link: {
    type: String,
    required: [true, 'Поле "Ссылка" является обязательным для заполнения'],
    validate: [validator.isURL, 'Поле "Ссылка" должно содержать URL'],
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
