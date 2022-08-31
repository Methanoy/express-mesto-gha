const { celebrate, Joi } = require('celebrate');
const urlRegExp = require('../utils/regExpConstant');

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
    password: Joi.string().required().min(4),
  }),
});

const validateCreateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(urlRegExp),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(4),
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
    avatar: Joi.string().required().pattern(urlRegExp),
  }),
});

/* Валидация данных карточки */

const validateCreateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(urlRegExp),
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
