var express = require('express');
var router = express.Router();
const postsController = require('../controllers/postsController');

var multer = require('multer');
const upload = multer({dest: '/public/images'})

router.post('/publish', upload.single('picture'), postsController.agregarPost)
router.get('/add', postsController.nuevoPost );


router.get('/detail/:id', postsController.post);


router.post('/hacercomentario/:id', postsController.comentar)
router.post("/subir", upload.single("imagen"), postsController.agregarPost)
module.exports = router

