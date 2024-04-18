const router = require('express').Router();
const { resultController } = require('../controllers');


router.get('/:id', resultController.fetchResult)

module.exports = router;