const Card = require('../models/card');
const BadRequestError = require('../errors/BadRequestError');
const ServerError = require('../errors/ServerError');
const NotFoundError = require('../errors/NotFoundError');

const createCard = async (req, res) => {
  try {
    const { name, link } = req.body;
    if (!link) {
      throw new BadRequestError('Переданы некорректные данные при создании карточки: link');
    }
    if (!name) {
      throw new BadRequestError('Переданы некорректные данные при создании карточки: name');
    }
    const card = await Card.create({ name, link, owner: req.user._id });
    res.status(200).send(card);
  } catch (err) {
    if (err instanceof BadRequestError) {
      res.status(err.codeStatus).send({ message: err.message });
      return;
    }
    if (err) {
      res.status(500).send({ message: `Ошибка сервера при создании карточки: ${err.message}` });
      return;
    }
  }
};

const deleteCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndRemove(req.params.cardId);
    if (!card) {
      throw new NotFoundError('Карточка с указанным _id не найдена.');
    }
    res.status(200).send(card);
  } catch (err) {
    if (err.name === 'NotFoundError') {
      res.status(err.codeStatus).send({ message: err.message });
      return;
    }
    if (err) {
      res.status(500).send({ message: `Ошибка сервера при создании карточки: ${err.message}` });
      return;
    }
  }
};

const getAllCards = async (req, res) => {
  try {
    const cards = await Card.find();
    res.status(200).send(cards);
  } catch (err) {
    if (err instanceof ServerError) {
      res.status(err.codeStatus).send({ message: err.message });
      return;
    }
    if (err) {
      res.status(500).send({ message: `Ошибка сервера при получении карточек: ${err.message}` });
      return;
    }
  }
};

const likeCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndUpdate(req.params.cardId, {
      $addToSet: { likes: req.user._id },
    }, { new: true });
    if (!card) {
      throw new NotFoundError('Карточка с указанным _id не найдена.');
    }
    res.status(200).send(card);
  } catch (err) {
    if (err instanceof NotFoundError) {
      res.status(err.codeStatus).send({ message: err.message });
      return;
    }
    if (err instanceof BadRequestError) {
      res.status(err.codeStatus).send({ message: err.message });
      return;
    }
    if (err) {
      res.status(500).send({ message: `Ошибка сервера при добавлении лайка карточке: ${err.message}` });
      return;
    }
  }
};

const dislikeCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndUpdate(req.params.cardId, {
      $pull: { likes: req.user._id },
    }, { new: true });
    if (!card) {
      throw new NotFoundError('Карточка с указанным _id не найдена.');
    }
    res.status(200).send(card);
  } catch (err) {
    if (err instanceof NotFoundError) {
      res.status(err.codeStatus).send({ message: err.message });
      return;
    }
    if (err instanceof BadRequestError) {
      res.status(err.codeStatus).send({ message: err.message });
      return;
    }
    if (err) {
      res.status(500).send({ message: `Ошибка сервера при удалении лайка карточки: ${err.message}` });
      return;
    }
  }
};

module.exports = {
  createCard, deleteCard, getAllCards, likeCard, dislikeCard,
};
