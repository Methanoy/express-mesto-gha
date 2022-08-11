const User = require('../models/user');

const createUser = (req, res) => {
  User
    .create(req.body)
    .then((user) => res.status(201).send(user))
    .catch((err) => res.status(500).send({ message: `Error creating user ${err}` }));
};

const getUserById = (req, res) => {
  User
    .findById(req.params.id)
    .then((user) => res.status(201).send(user))
    .catch((err) => res.status(500).send({ message: `Error getting user ${err}` }));
};

const getAllUsers = (req, res) => {
  User
    .find()
    .then((user) => res.status(201).send(user))
    .catch((err) => res.status(500).send({ message: `Error getting user ${err}` }));
};

module.exports = { createUser, getUserById, getAllUsers };
