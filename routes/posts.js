var express = require('express');
var router = express.Router();

var multer = require('multer');
const path = require('path')

var storage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, 'public/images/')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path. extname(file.originalname))
    },
})

var upload = multer ({ storage: storage })


const postsController = require('../controllers/postsController');

router.get('/detail/:id', postsController.post);
router.get('/add', postsController.agregarPost );
router.post('/hacercomentario/:id', postsController.comentar)
router.post("/subir", upload.single("imagen"), postsController.subir)
module.exports = router