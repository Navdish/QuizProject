const router = require('express').Router();
const { responseController } = require('../controllers');


router.post('/:id', responseController.addResponse)
router.get('/:id', responseController.fetchResponse)

module.exports = router;