var express = require('express');
var router = express.Router();
const usersController = require('../controllers/usersController');

/*Multer*/

var multer = require('multer');
const path = require('path')

var storage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, '../public/images/foto')
    },
    filename: (req, res, cb) => {
        cb(null, file.fieldname + ' ' + Date.now() + path. extname(file.originalname))
    },
})

var upload = multer ({ storage: storage })

router.post('/', upload.single('foto', usersController.store))


/* GET users listing. */

/* Perfil */

router.get('/profile/:id', usersController.miPerfil);

/* Registro */

router.get('/register', usersController.registracion);
router.post ('/register', upload.single('foto'), usersController.store)
router.post('/register', [
    check('email').isEmail().withMessage('Ingrese un email válido'),
    check('password').isLenght({min: 4}).withMessage('Ingrese una contraseña válida'),
                      ], usersController.processLogin)


/* Login */

router.get ('/login', usersController.login) 
router.post('/login', [
    check('email').isEmail().withMessage('Ingrese un email válido'),
    check('password').isLenght({min: 4}).withMessage('Ingrese una contraseña válida'),
                      ], usersController.processLogin)

router.get('/check', function(req, res){
    if (req.session.usuarioLogueado == undefined){
        res.send("No estás logueado aún!")
    } else {
        res.send("El usuario logueado es " + req.session.usuarioLogueado.email)
    }
},

/* Editar perfil */

router.get ('/edit', usersController.editarPerfil),



module.exports = router)
