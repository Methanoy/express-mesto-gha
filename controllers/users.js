const User = require('../models/user');

const createUser = (req, res) => {
  User
    .create(req.body)
    .then((user) => res.status(201).send(user))
    .catch((err) => res.status(500).send({ message: `Error user creating ${err}` }));
};

// const getUser = (req, res) => {};

// const getAllUsers = (req, res) => {};

module.exports = { createUser };
