const router = require('express').Router();
const { authController } = require('../controllers');

router.post('/signup', authController.createUser)
router.post('/login', authController.loginUser)

module.exports = router;