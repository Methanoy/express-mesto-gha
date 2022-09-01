const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const BadRequestError = require('../errors/BadRequestError');

const validateUrl = (value) => {
  if (!validator.isURL(value)) {
    throw new BadRequestError('Передан некорректный адрес URL');
  }
  return value;
};

/* Валидация ID */

const validateId = celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24).alphanum(),
  }),
});

/* Валидация данных пользователя */

const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validateCreateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom(validateUrl),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validateUpdateUserProfile = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
});

const validateUpdateUserAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().custom(validateUrl),
  }),
});

/* Валидация данных карточки */

const validateCreateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().custom(validateUrl),
  }),
});

module.exports = {
  validateId,
  validateLogin,
  validateCreateUser,
  validateUpdateUserProfile,
  validateUpdateUserAvatar,
  validateCreateCard,
};
