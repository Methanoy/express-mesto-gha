const { celebrate, Joi } = require('celebrate');

const urlRegEx = /[-a-zA-Z0-9@:%_+.~#?&/=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_+.~#?&/=]*)?/i;

/* Валидация ID */

const validateId = celebrate({
  body: Joi.object().keys({
    _id: Joi.string().hex().length(24),
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
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
    avatar: Joi.string().required().pattern(urlRegEx),
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
    avatar: Joi.string().required().pattern(urlRegEx),
  }),
});

/* Валидация данных карточки */

const validateCreateCard = celebrate({
  body: Joi.object.keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(urlRegEx),
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
