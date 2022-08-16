const Card = require('../models/card');
const NotFoundError = require('../errors/NotFoundError');

const createCard = (req, res) => {
  const { name, link } = req.body;
  Card
    .create({ name, link, owner: req.user._id })
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: `Переданы некорректные данные при создании карточки. ${err.message}` });
        return;
      }
      res.status(500).send({ message: `Ошибка сервера при создании карточки: ${err.message}` });
    });
};

const deleteCard = (req, res) => {
  Card
    .findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка с указанным _id не найдена.');
      }
      res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'NotFoundError') {
        res.status(err.codeStatus).send({ message: err.message });
        return;
      }
      if (err.name === 'CastError') {
        res.status(400).send({ message: `Переданы некорректные данные при удалении карточки. ${err.message}` });
        return;
      }
      res.status(500).send({ message: `Ошибка сервера при удалении карточки. ${err.message}` });
    });
};

const getAllCards = (req, res) => {
  Card
    .find()
    .then((cards) => res.status(200).send(cards))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: `Переданы некорректные данные при получении карточек. ${err.message}` });
        return;
      }
      res.status(500).send({ message: `Ошибка сервера при получении карточек. ${err.message}` });
    });
};

const likeCard = (req, res) => {
  Card
    .findByIdAndUpdate(req.params.cardId, {
      $addToSet: { likes: req.user._id },
    }, { new: true })
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка с указанным _id не найдена.');
      }
      res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'NotFoundError') {
        res.status(err.codeStatus).send({ message: err.message });
        return;
      }
      if (err.name === 'CastError') {
        res.status(400).send({ message: `Переданы некорректные данные при добавлении лайка. ${err.message}` });
        return;
      }
      res.status(500).send({ message: `Ошибка сервера при добавлении лайка карточке. ${err.message}` });
    });
};

const dislikeCard = (req, res) => {
  Card
    .findByIdAndUpdate(req.params.cardId, {
      $pull: { likes: req.user._id },
    }, { new: true })
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка с указанным _id не найдена.');
      }
      res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'NotFoundError') {
        res.status(err.codeStatus).send({ message: err.message });
        return;
      }
      if (err.name === 'CastError') {
        res.status(400).send({ message: `Переданы некорректные данные при удалении лайка. ${err.message}` });
        return;
      }
      res.status(500).send({ message: `Ошибка сервера при удалении лайка карточки. ${err.message}` });
    });
};

module.exports = {
  createCard, deleteCard, getAllCards, likeCard, dislikeCard,
};
