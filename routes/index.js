var express = require('express');
var router = express.Router();
const indexController = require('../controllers/indexController');

/* GET home page. */
router.get('/', indexController.index);
router.get ('/result', indexController.result) 
router.get ('/resultUser', indexController.resultUser)

module.exports = router;
