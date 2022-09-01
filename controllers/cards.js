const Card = require('../models/card');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card
    .create({ name, link, owner: req.user._id })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при создании карточки.'));
      } else {
        next(err);
      }
    });
};

const deleteCard = (req, res, next) => {
  const { id } = req.params;
  Card
    .findById(id)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка с указанным _id не найдена.');
      } else if (card.owner.toString() !== req.user._id) {
        throw new ForbiddenError('Вы не можете удалить чужую карточку.');
      } else {
        Card
          .findByIdAndRemove(id)
          .then((cardToDelete) => {
            res.send({ cardToDelete });
          });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные при удалении карточки.'));
      } else {
        next(err);
      }
    });
};

const getAllCards = (req, res, next) => {
  Card
    .find({})
    .then((cards) => res.status(200).send(cards))
    .catch(next);
};

const likeCard = (req, res, next) => {
  Card
    .findByIdAndUpdate(req.params.id, {
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
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные при удалении карточки.'));
      } else {
        next(err);
      }
    });
};

const dislikeCard = (req, res, next) => {
  Card
    .findByIdAndUpdate(req.params.id, {
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
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные при удалении карточки.'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  createCard, deleteCard, getAllCards, likeCard, dislikeCard,
};
