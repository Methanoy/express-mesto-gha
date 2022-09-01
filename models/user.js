const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const validator = require('validator');
const UnauthorizedError = require('../errors/UnauthorizedError');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [2, 'Поле "Имя" должно содержать не менее 2 символов'],
    maxlength: [30, 'Поле "Имя" должно содержать не более 30 символов'],
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: [2, 'Поле "О себе" должно содержать не менее 2 символов'],
    maxlength: [30, 'Поле "О себе" должно содержать не более 30 символов'],
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: [validator.isURL, 'Поле "Аватар" должно содержать корректный URL'],
  },
  email: {
    type: String,
    required: [true, 'Поле "Почта" является обязательным для заполнения'],
    unique: [true, 'Пользователь с аналогичным email уже зарегистрирован'],
    validate: [validator.isEmail, 'Поле "Почта" должно содержать email'],
  },
  password: {
    type: String,
    required: [true, 'Поле "Пароль" является обязательным для заполнения'],
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new UnauthorizedError('Неправильная почта или пароль.'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new UnauthorizedError('Неправильная почта или пароль.'));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('User', userSchema);
