const userRouter = require('express').Router();
const {
  createUser, getUserById, getAllUsers, updateUserProfile, updateUserAvatar,
} = require('../controllers/users');

userRouter.post('/', createUser);
userRouter.get('/:userId', getUserById);
userRouter.get('/', getAllUsers);
userRouter.patch('/me', updateUserProfile);
userRouter.patch('/me/avatar', updateUserAvatar);

module.exports = userRouter;
