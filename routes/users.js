var express = require('express');
var router = express.Router();
const usersController = require('../controllers/usersController');

//Multer

const multer = require('multer');
const path = require("path")
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
          cb(null, './public/images/usuarios')
    },
    filename: (req, file, cb) => {
          cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
  })
var upload = multer({ storage: storage });


/* GET users listing. */

/* Perfil */

router.get('/profile/:id', usersController.miPerfil);

/* Registro */

router.get('/register', usersController.registracion);
router.post ('/register', upload.single('imagen'), usersController.processRegistracion)

/* Login */

router.get ('/login', usersController.login) 
router.post('/login', usersController.processLogin)



/* Editar perfil */

router.get ('/edit', usersController.editarPerfil),
router.get ('/logout', usersController.logout) 


module.exports = router
