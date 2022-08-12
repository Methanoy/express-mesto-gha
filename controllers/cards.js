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

const likeCard = (req, res) => {
  Card
    .findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((cards) => res.status(201).send(cards))
    .catch((err) => res.status(500).send({ message: `Error liking card ${err}` }));
};

const dislikeCard = (req, res) => {
  Card
    .findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((cards) => res.status(201).send(cards))
    .catch((err) => res.status(500).send({ message: `Error disliking card ${err}` }));
};

module.exports = {
  createCard, deleteCard, getAllCards, likeCard, dislikeCard,
};
