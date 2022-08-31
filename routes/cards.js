const cardsRouter = require('express').Router();
const { validateId, validateCreateCard } = require('../middlewares/inputDataValidation');
const {
  createCard, deleteCard, getAllCards, likeCard, dislikeCard,
} = require('../controllers/cards');

cardsRouter.post('/', validateCreateCard, createCard);
cardsRouter.get('/', getAllCards);
cardsRouter.delete('/:id', validateId, deleteCard);
cardsRouter.put('/:id/likes', validateId, likeCard);
cardsRouter.delete('/:id/likes', validateId, dislikeCard);

module.exports = cardsRouter;
