const User = require('../models/user');
const BadRequestError = require('../errors/BadRequestError');
const ServerError = require('../errors/ServerError');
const NotFoundError = require('../errors/NotFoundError');

const createUser = async (req, res) => {
  try {
    const { name, about, avatar } = req.body;
    if (!name) {
      throw new BadRequestError('Переданы некорректные данные при создании пользователя в строке: name');
    }
    if (!about) {
      throw new BadRequestError('Переданы некорректные данные при создании пользователя в строке: about');
    }
    if (!avatar) {
      throw new BadRequestError('Переданы некорректные данные при создании пользователя в строке: avatar');
    }
    const user = await User.create({ name, about, avatar });
    res.status(200).send(user);
  } catch (err) {
    if (err instanceof BadRequestError) {
      res.status(err.codeStatus).send({ message: err.message });
      return;
    }
    if (err) {
      res.status(500).send({ message: `Ошибка сервера при создании пользователя: ${err.message}` });
      return;
    }
  }
};

const getUserById = (req, res) => {
  const { userId } = req.params;
  User
    .findById(userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь по указанному _id не найден.');
      }
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err instanceof NotFoundError) {
        res.status(err.codeStatus).send({ message: err.message });
        return;
      }
      if (err) {
        res.status(500).send({ message: `Ошибка сервера при поиске пользователя по _id: ${err.message}` });
        return;
      }
    });
};

const getAllUsers = (req, res) => {
  User
    .find()
    .then((users) => res.status(200).send(users))
    .catch((err) => {
      if (err instanceof ServerError) {
        res.status(err.codeStatus).send({ message: err.message });
        return;
      }
      if (err) {
        res.status(500).send({ message: `Ошибка сервера при получении списка пользователей: ${err.message}` });
        return;
      }
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
      if (err instanceof NotFoundError) {
        res.status(err.codeStatus).send({ message: err.message });
        return;
      }
      if (err instanceof BadRequestError) {
        res.status(err.codeStatus).send({ message: err.message });
        return;
      }
      if (err) {
        res.status(500).send({ message: `Ошибка обновления данных профиля: ${err.message}` });
        return;
      }
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
      if (err instanceof NotFoundError) {
        res.status(err.codeStatus).send({ message: err.message });
        return;
      }
      if (err instanceof BadRequestError) {
        res.status(err.codeStatus).send({ message: err.message });
        return;
      }
      if (err) {
        res.status(500).send({ message: `Ошибка сервера при обновлении аватара пользователя: ${err.message}` });
        return;
      }
    });
};

module.exports = {
  createUser, getUserById, getAllUsers, updateUserProfile, updateUserAvatar,
};
