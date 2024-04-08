const router = require('express').Router();
const { questionController } = require('../controllers');


router.get('/:id', questionController.fetchQuestion)
router.post('/', questionController.addQuestion)


module.exports = router;