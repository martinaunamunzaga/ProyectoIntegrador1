var express = require('express');
var router = express.Router();

var multer = require('multer');
const upload = multer({ dest: 'public/' });  //falta la segunda carpeta

const postsController = require('../controllers/postsController');

router.get('/detail/:id', postsController.post);
router.get('/add', postsController.agregarPost );

module.exports = router