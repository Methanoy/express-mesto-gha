const cardsRouter = require('express').Router();
const { validateId, validateCreateCard } = require('../middlewares/inputDataValidation');
const {
  createCard, deleteCard, getAllCards, likeCard, dislikeCard,
} = require('../controllers/cards');

cardsRouter.post('/', validateCreateCard, createCard);
cardsRouter.get('/', getAllCards);
cardsRouter.delete('/:cardId', validateId, deleteCard);
cardsRouter.put('/:cardId/likes', validateId, likeCard);
cardsRouter.delete('/:cardId/likes', validateId, dislikeCard);

module.exports = cardsRouter;
