const router = require('express').Router();
const { createUser, getUser, getAllUsers } = require('../controllers/users');

router.post('/', createUser);
router.get('/:id', getUser);
router.get('/', getAllUsers);

module.exports = router;
