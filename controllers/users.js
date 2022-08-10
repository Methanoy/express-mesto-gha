const User = require('../models/user');

const createUser = (req, res) => {
  User
    .create(req.body)
    .then((user) => res.status(201).send(user))
    .catch((err) => res.status(500).send({ message: `Error creating user ${err}` }));
};

const getUser = (req, res) => {
  User
    .findById(req.params._id)
    .then((user) => res.status(201).send(user))
    .catch((err) => res.status(500).send({ message: `Error getting user ${err}` }));
};

// const getAllUsers = (req, res) => {};

module.exports = { createUser, getUser };
