const cards = require('express').Router();
const { createCard, deleteCard, getAllCards } = require('../controllers/cards');

cards.post('/', createCard);
cards.get('/', getAllCards);
cards.delete('/:cardId', deleteCard);

module.exports = cards;
