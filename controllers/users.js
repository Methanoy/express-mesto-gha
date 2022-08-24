const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const { BAD_REQ_ERR_CODE, SERV_ERR_CODE } = require('../utils/errorConstants');

const { NODE_ENV, JWT_SECRET } = process.env;

const createUser = (req, res) => {
  const {
    name, about, avatar, password, email,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User
      .create({
        name, about, avatar, password: hash, email,
      }))
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQ_ERR_CODE).send({ message: `Переданы некорректные данные при создании пользователя. ${err.message}` });
      } else {
        res.status(SERV_ERR_CODE).send({ message: `Ошибка при создании пользователя. ${err.message}` });
      }
    });
};

const login = (req, res) => {
  const { email, password } = req.params.body;
  User
    .findUserByCredentials(email, password)
    .then((user) => {
      if (!user) {
        throw new Error('Переданы некорректные данные при авторизации пользователя.');
      } else {
        const token = jwt.sign(
          { _id: user._id },
          NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
          { expiresIn: '7d' },
        );

        res.cookie('jwt', token, {
          maxAge: 3600000,
          httpOnly: true,
        })
          .send({ token });
      }
    })
    .catch((err) => {
      if (err.name === 'Error') {
        res.status(401).send({ message: err.message });
      } else if (err.name === 'CastError') {
        res.status(BAD_REQ_ERR_CODE).send({ message: `Переданы некорректные данные при аутентификации пользователя. ${err.message}` });
      } else {
        res.status(SERV_ERR_CODE).send({ message: `Ошибка сервера при аутентификации пользователя. ${err.message}` });
      }
    });
};

const getUserById = (req, res) => {
  User
    .findById(req.params.userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь по указанному _id не найден.');
      } else {
        res.status(200).send(user);
      }
    })
    .catch((err) => {
      if (err.name === 'NotFoundError') {
        res.status(err.codeStatus).send({ message: err.message });
      } else if (err.name === 'CastError') {
        res.status(BAD_REQ_ERR_CODE).send({ message: `Переданы некорректные данные при поиске пользователя по _id. ${err.message}` });
      } else {
        res.status(SERV_ERR_CODE).send({ message: `Ошибка сервера при поиске пользователя. ${err.message}` });
      }
    });
};

const getAllUsers = (req, res) => {
  User
    .find()
    .then((users) => res.status(200).send(users))
    .catch((err) => res.status(SERV_ERR_CODE).send({ message: `Ошибка сервера при получении списка пользователей. ${err.message}` }));
};

const updateUserProfile = (req, res) => {
  const { name, about } = req.body;
  User
    .findByIdAndUpdate(req.user._id, { name, about }, {
      new: true, runValidators: true,
    })
    .then((userData) => {
      if (!userData) {
        throw new NotFoundError('Пользователь с указанным _id не найден.');
      } else {
        res.status(200).send({ data: userData });
      }
    })
    .catch((err) => {
      if (err.name === 'NotFoundError') {
        res.status(err.codeStatus).send({ message: err.message });
      } else if (err.name === 'ValidationError' || err.name === 'CastError') {
        res.status(BAD_REQ_ERR_CODE).send({ message: `Переданы некорректные данные при обновлении профиля. ${err.message}` });
      } else {
        res.status(SERV_ERR_CODE).send({ message: `Ошибка обновления данных профиля. ${err.message}` });
      }
    });
};

const updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User
    .findByIdAndUpdate(req.user._id, { avatar }, {
      new: true, runValidators: true,
    })
    .then((userData) => {
      if (!userData) {
        throw new NotFoundError('Пользователь с указанным _id не найден.');
      } else {
        res.status(200).send({ data: userData });
      }
    })
    .catch((err) => {
      if (err.name === 'NotFoundError') {
        res.status(err.codeStatus).send({ message: err.message });
      } else if (err.name === 'ValidationError' || err.name === 'CastError') {
        res.status(BAD_REQ_ERR_CODE).send({ message: `Переданы некорректные данные при обновлении профиля. ${err.message}` });
      } else {
        res.status(SERV_ERR_CODE).send({ message: `Ошибка сервера при обновлении аватара. ${err.message}` });
      }
    });
};

module.exports = {
  createUser, login, getUserById, getAllUsers, updateUserProfile, updateUserAvatar,
};
