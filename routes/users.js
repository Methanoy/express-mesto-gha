const router = require('express').Router();
const { createUser, getUserById, getAllUsers } = require('../controllers/users');

router.post('/', createUser);
router.get('/:userId', getUserById);
router.get('/', getAllUsers);

module.exports = router;
