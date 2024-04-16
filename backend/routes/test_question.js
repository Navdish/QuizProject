const router = require('express').Router();
const { test_questionController } = require('../controllers');


router.post('/', test_questionController.add_test_question)


module.exports = router;