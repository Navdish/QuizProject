const router = require('express').Router();
const { testController } = require('../controllers');



router.post('/', testController.addTest)
router.get('/', testController.fetchTest)

module.exports = router;