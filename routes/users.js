var express = require('express');
var router = express.Router();
const usersController = require('../controllers/usersController');
var multer = require('multer');
const upload = multer({ dest: 'public/images/' });

/* GET users listing. */
router.get('/profile/:id', usersController.miPerfil);
router.get('/register', usersController.registracion);
router.get ('/login', usersController.login) 
router.get ('/edit', usersController.editarPerfil)
router.post (`/register`, upload.single(`imagen`), usersController.store)

module.exports = router;
