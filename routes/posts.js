var express = require('express');
var router = express.Router();
const postsController = require('../controllers/postsController');

const multer = require('multer');
const path = require("path")
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
          cb(null, '../public/images/products')
    },
    filename: (req, file, cb) => {
          cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
  })
var upload = multer({ storage: storage });

router.post('/add', upload.single('imagen'), postsController.agregarPost)
router.get('/add', postsController.nuevoPost );


router.get('/detail/:id', postsController.post);


router.post('/hacercomentario/:id', postsController.comentar)
router.post("/subir", upload.single("imagen"), postsController.agregarPost)
module.exports = router

