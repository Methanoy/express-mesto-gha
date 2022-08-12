const cardsRouter = require('express').Router();
const { createCard, deleteCard, getAllCards } = require('../controllers/cards');

cardsRouter.post('/', createCard);
cardsRouter.get('/', getAllCards);
cardsRouter.delete('/:cardId', deleteCard);

module.exports = cardsRouter;
