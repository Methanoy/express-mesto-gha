const User = require('../models/user');

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User
    .create({ name, about, avatar })
    .then((user) => res.status(201).send(user))
    .catch((err) => res.status(500).send({ message: `Error creating user ${err}` }));
};

const getUserById = (req, res) => {
  const { userId } = req.params;
  User
    .findById(userId)
    .then((user) => res.status(201).send(user))
    .catch((err) => res.status(500).send({ message: `Error getting an user ${err}` }));
};

const getAllUsers = (req, res) => {
  User
    .find()
    .then((users) => res.status(201).send(users))
    .catch((err) => res.status(500).send({ message: `Error getting users ${err}` }));
};

const updateUserProfile = (req, res) => {
  const { name, about } = req.body;
  User
    .findByIdAndUpdate(req.user._id, { name, about }, {
      new: true, runValidators: true, upsert: true,
    })
    .then((user) => res.status(201).send({ data: user }))
    .catch((err) => res.status(500).send({ message: `Error getting users ${err}` }));
};

const updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User
    .findByIdAndUpdate(req.user._id, { avatar }, {
      new: true, runValidators: true, upsert: true,
    })
    .then((user) => res.status(201).send({ data: user }))
    .catch((err) => res.status(500).send({ message: `Error getting users ${err}` }));
};

module.exports = {
  createUser, getUserById, getAllUsers, updateUserProfile, updateUserAvatar,
};
