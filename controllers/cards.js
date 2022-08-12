const Card = require('../models/card');

const createCard = (req, res) => {
  const { name, link } = req.body;
  Card
    .create({ name, link, owner: req.user._id })
    .then((card) => res.status(201).send(card))
    .catch((err) => res.status(500).send({ message: `Error creating card ${err}` }));
};

const deleteCard = (req, res) => {
  const { cardId } = req.params;
  Card
    .findByIdAndRemove(cardId)
    .then((card) => res.status(201).send(card))
    .catch((err) => res.status(500).send({ message: `Error deleting an card ${err}` }));
};

const getAllCards = (req, res) => {
  Card
    .find()
    .then((cards) => res.status(201).send(cards))
    .catch((err) => res.status(500).send({ message: `Error getting cards ${err}` }));
};

module.exports = { createCard, deleteCard, getAllCards };
