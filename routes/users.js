const userRouter = require('express').Router();
const {
  getUserById, getAllUsers, updateUserProfile, updateUserAvatar, getCurrentUserData,
} = require('../controllers/users');

userRouter.get('/', getAllUsers);
userRouter.get('/me', getCurrentUserData);
userRouter.get('/:userId', getUserById);
userRouter.patch('/me', updateUserProfile);
userRouter.patch('/me/avatar', updateUserAvatar);

module.exports = userRouter;
