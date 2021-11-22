var express = require('express');
var router = express.Router();

var multer = require('multer');
const upload = multer({dest: '/public/images'})
router.post('/publish', upload.single('picture'), postsController.store)

const postsController = require('../controllers/postsController');

router.get('/detail/:id', postsController.post);
router.get('/add', postsController.agregarPost );
router.post('/hacercomentario/:id', postsController.comentar)
router.post("/subir", upload.single("imagen"), postsController.subir)
module.exports = router

