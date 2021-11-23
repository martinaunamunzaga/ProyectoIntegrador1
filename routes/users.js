var express = require('express');
var router = express.Router();
const usersController = require('../controllers/usersController');

//Multer

var multer = require('multer');
const upload = multer({dest:'../public/images'})


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
