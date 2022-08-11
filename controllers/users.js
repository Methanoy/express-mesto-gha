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
    .then((user) => res.status(201).send(user))
    .catch((err) => res.status(500).send({ message: `Error getting users ${err}` }));
};

module.exports = { createUser, getUserById, getAllUsers };
