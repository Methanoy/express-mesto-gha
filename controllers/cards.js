const Card = require('../models/card');
const NotFoundError = require('../errors/NotFoundError');
const { VAL_ERR_CODE, CAST_ERR_CODE, SERV_ERR_CODE } = require('../utils/errorConstants');

const createCard = (req, res) => {
  const { name, link } = req.body;
  Card
    .create({ name, link, owner: req.user._id })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(VAL_ERR_CODE).send({ message: `Переданы некорректные данные при создании карточки. ${err.message}` });
      } else {
        res.status(SERV_ERR_CODE).send({ message: `Ошибка сервера при создании карточки: ${err.message}` });
      }
    });
};

const deleteCard = (req, res) => {
  Card
    .findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка с указанным _id не найдена.');
      } else {
        res.status(200).send(card);
      }
    })
    .catch((err) => {
      if (err.name === 'NotFoundError') {
        res.status(err.codeStatus).send({ message: err.message });
      } else if (err.name === 'CastError') {
        res.status(CAST_ERR_CODE).send({ message: `Переданы некорректные данные при удалении карточки. ${err.message}` });
      } else {
        res.status(SERV_ERR_CODE).send({ message: `Ошибка сервера при удалении карточки. ${err.message}` });
      }
    });
};

const getAllCards = (req, res) => {
  Card
    .find()
    .then((cards) => res.status(200).send(cards))
    .catch((err) => res.status(SERV_ERR_CODE).send({ message: `Ошибка сервера при получении карточек. ${err.message}` }));
};

const likeCard = (req, res) => {
  Card
    .findByIdAndUpdate(req.params.cardId, {
      $addToSet: { likes: req.user._id },
    }, { new: true })
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка с указанным _id не найдена.');
      } else {
        res.status(200).send(card);
      }
    })
    .catch((err) => {
      if (err.name === 'NotFoundError') {
        res.status(err.codeStatus).send({ message: err.message });
      } else if (err.name === 'CastError') {
        res.status(CAST_ERR_CODE).send({ message: `Переданы некорректные данные при добавлении лайка. ${err.message}` });
      } else {
        res.status(SERV_ERR_CODE).send({ message: `Ошибка сервера при добавлении лайка карточке. ${err.message}` });
      }
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
      } else {
        res.status(200).send(card);
      }
    })
    .catch((err) => {
      if (err.name === 'NotFoundError') {
        res.status(err.codeStatus).send({ message: err.message });
      } else if (err.name === 'CastError') {
        res.status(CAST_ERR_CODE).send({ message: `Переданы некорректные данные при удалении лайка. ${err.message}` });
      } else {
        res.status(SERV_ERR_CODE).send({ message: `Ошибка сервера при удалении лайка карточки. ${err.message}` });
      }
    });
};

module.exports = {
  createCard, deleteCard, getAllCards, likeCard, dislikeCard,
};
