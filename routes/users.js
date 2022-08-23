const userRouter = require('express').Router();
const {
  getUserById, getAllUsers, updateUserProfile, updateUserAvatar,
} = require('../controllers/users');

userRouter.get('/:userId', getUserById);
userRouter.get('/', getAllUsers);
userRouter.patch('/me', updateUserProfile);
userRouter.patch('/me/avatar', updateUserAvatar);

module.exports = userRouter;
