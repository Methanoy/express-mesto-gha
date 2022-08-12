const userRouter = require('express').Router();
const { createUser, getUserById, getAllUsers } = require('../controllers/users');

userRouter.post('/', createUser);
userRouter.get('/:userId', getUserById);
userRouter.get('/', getAllUsers);

module.exports = userRouter;
