const { authenticateUser } = require('../middleware/auth');

const router = require('express').Router();

router.use('/auth', require('./auth'));
router.use('/test',authenticateUser, require('./test'));
router.use('/question',authenticateUser, require('./question'));
router.use('/response', authenticateUser, require('./response'));
router.use('/test_question', authenticateUser, require('./test_question'));
router.use('/result', authenticateUser, require('./result'));

module.exports = router;