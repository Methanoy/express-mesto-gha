const router = require('express').Router();
const { createUser, getUser, getAllUser } = require('../controllers/users');

router.post('/', createUser);
router.get('/:id', getUser);
router.get('/', getAllUser);

module.exports = router;
