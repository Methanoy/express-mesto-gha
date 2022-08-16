const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User
    .create({ name, about, avatar })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: `Переданы некорректные данные при создании пользователя. ${err.message}` });
        return;
      }
      res.status(500).send({ message: `Ошибка при создании пользователя. ${err.message}` });
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
        return;
      }
      if (err.name === 'CastError') {
        res.status(400).send({ message: `Переданы некорректные данные при поиске пользователя по _id. ${err.message}` });
        return;
      }
      res.status(500).send({ message: `Ошибка сервера при поиске пользователя. ${err.message}` });
    });
};

const getAllUsers = (req, res) => {
  User
    .find()
    .then((users) => res.status(200).send(users))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: `Переданы некорректные данные при получении списка пользователей: ${err.message}` });
        return;
      }
      res.status(500).send({ message: `Ошибка сервера при получении списка пользователей. ${err.message}` });
    });
};

const updateUserProfile = (req, res) => {
  const { name, about } = req.body;
  User
    .findByIdAndUpdate(req.user._id, { name, about }, {
      new: true, runValidators: true, upsert: true,
    })
    .then((userData) => {
      if (!userData) {
        throw new NotFoundError('Пользователь с указанным _id не найден.');
      }
      res.status(200).send({ data: userData });
    })
    .catch((err) => {
      if (err.name === 'NotFoundError') {
        res.status(err.codeStatus).send({ message: err.message });
        return;
      }
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: `Переданы некорректные данные при обновлении профиля. ${err.message}` });
        return;
      }
      res.status(500).send({ message: `Ошибка обновления данных профиля. ${err.message}` });
    });
};

const updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User
    .findByIdAndUpdate(req.user._id, { avatar }, {
      new: true, runValidators: true, upsert: true,
    })
    .then((userData) => {
      if (!userData) {
        throw new NotFoundError('Пользователь с указанным _id не найден.');
      }
      res.status(200).send({ data: userData });
    })
    .catch((err) => {
      if (err.name === 'NotFoundError') {
        res.status(err.codeStatus).send({ message: err.message });
        return;
      }
      if (err.name === 'CastError') {
        res.status(400).send({ message: `Переданы некорректные данные при обновлении профиля. ${err.message}` });
        return;
      }
      res.status(500).send({ message: `Ошибка сервера при обновлении аватара пользователя. ${err.message}` });
    });
};

module.exports = {
  createUser, getUserById, getAllUsers, updateUserProfile, updateUserAvatar,
};
