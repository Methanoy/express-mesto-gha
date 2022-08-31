const userRouter = require('express').Router();
const { validateId, validateUpdateUserProfile, validateUpdateUserAvatar } = require('../middlewares/inputDataValidation');
const {
  getUserById, getAllUsers, updateUserProfile, updateUserAvatar, getCurrentUserData,
} = require('../controllers/users');

userRouter.get('/', getAllUsers);
userRouter.get('/me', getCurrentUserData);
userRouter.get('/:userId', validateId, getUserById);
userRouter.patch('/me', validateUpdateUserProfile, updateUserProfile);
userRouter.patch('/me/avatar', validateUpdateUserAvatar, updateUserAvatar);

module.exports = userRouter;
