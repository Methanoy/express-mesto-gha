const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ConflictError = require('../errors/ConflictError');

const { NODE_ENV, JWT_SECRET } = process.env;

const createUser = (req, res, next) => {
  const {
    name, about, avatar, password, email,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User
      .create({
        name, about, avatar, password: hash, email,
      }))
    .then((user) => res.status(201).send(
      {
        data: {
          name: user.name,
          about: user.about,
          avatar: user.avatar,
          email: user.email,
        },
      },
    ))
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError('Пользователь с аналогичным email уже зарегистрирован.'));
      } else if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные при создании пользователя.'));
      } else {
        next(err);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  User
    .findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );

      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        secure: NODE_ENV === 'production',
        httpOnly: true,
      })
        .send({ message: 'Вы успешно авторизовались.' });
    })
    .catch(next);
};

const logout = (req, res, next) => {
  User
    .findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь по указанному _id не найден.');
      } else {
        res.clearCookie('jwt').send({ message: 'Вы успешно завршили сеанс.' });
      }
    })
    .catch(next);
};

const getCurrentUserData = (req, res, next) => {
  User
    .findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь по указанному _id не найден.');
      } else {
        res.status(200).send(user);
      }
    })
    .catch(next);
};

const getUserById = (req, res, next) => {
  User
    .findById(req.params.id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь по указанному _id не найден.');
      } else {
        res.status(200).send({ user });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные при поиске пользователя.'));
      } else {
        next(err);
      }
    });
};

const getAllUsers = (req, res, next) => {
  User
    .find({})
    .then((users) => res.status(200).send(users))
    .catch(next);
};

const updateUserProfile = (req, res, next) => {
  const { name, about } = req.body;
  User
    .findByIdAndUpdate(req.user._id, { name, about }, {
      new: true, runValidators: true,
    })
    .then((userData) => {
      if (!userData) {
        throw new NotFoundError('Пользователь с указанным _id не найден.');
      } else {
        res.status(200).send(userData);
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные при обновлени профиля пользователя.'));
      } else {
        next(err);
      }
    });
};

const updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User
    .findByIdAndUpdate(req.user._id, { avatar }, {
      new: true, runValidators: true,
    })
    .then((userData) => {
      if (!userData) {
        throw new NotFoundError('Пользователь с указанным _id не найден.');
      } else {
        res.status(200).send(userData);
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные при обновлении аватара пользователя.'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  createUser,
  login,
  logout,
  getUserById,
  getAllUsers,
  updateUserProfile,
  updateUserAvatar,
  getCurrentUserData,
};
