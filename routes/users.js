const userRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUserById, getAllUsers, updateUserProfile, updateUserAvatar, getCurrentUserData,
} = require('../controllers/users');

userRouter.get('/', getAllUsers);
userRouter.get('/me', getCurrentUserData);
userRouter.get('/:userId', getUserById);
userRouter.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateUserProfile);
userRouter.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(/[-a-zA-Z0-9@:%_+.~#?&/=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_+.~#?&/=]*)?/i),
  }),
}), updateUserAvatar);

module.exports = userRouter;
