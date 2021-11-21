var express = require('express');
var router = express.Router();
const usersController = require('../controllers/usersController');
var multer = require('multer');
const upload = multer({ dest: 'public/images/' });

/* GET users listing. */
router.get('/profile/:id', usersController.miPerfil);

router.get('/register', usersController.registracion);
router.post ('/register', upload.single('imagen'), usersController.store)

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

router.get ('/edit', usersController.editarPerfil),



module.exports = router)
