const db = require("../database/models")
const bcrypt = require("bcryptjs")
const validateUser = function (req) {
  const errors = [];

  if (!req.file) {
    errors.push('LA IMAGEN ES REQUERIDA');
  }
  if (!req.body.contraseña || req.body.contraseña.length < 3) {
    errors.push('LA CONSTRASEÑA NO PUEDE ESTAR VACÍA, NI SER MENOR A 3 CARACTERES');
  }
  if (!req.body.nombre) {
    errors.push('EL NOMBRE ES REQUERIDO');
  }
  if (!req.body.email) {
    errors.push('EL EMAIL ES REQUERIDO');
  }
  if (!req.body.nacimiento) {
    errors.push('LA FECHA ES REQUERIDA');
  }
  if (!req.body.telefono) {
    errors.push('EL TELÉFONO ES REQUERIDO');
  }

  return errors;
  
}
const controller = {
  miPerfil:  function(req, res) {
      
          res.render('miPerfil', {post:element});
        
      
    
      },
      registracion: function(req, res) {
        res.render('registracion');
      },
      store: function(req, res) {
        let errores = validateUser(req)
        if (errores.length > 0) {
          return res.send('registracion', {errores: errores});
        }

        req.body.contraseña = bcrypt.hashSync(req.body.contraseña, 10);

        req.body.imagen = (req.file.destination + req.file.filename).replace('public', '')
        db.Usuario.create(req.body)
          .then(post => {
            res.redirect('/');
          }).catch(error => {
            return res.render(error);
          })
        
      },
      login: function (req, res){
        res.render ('login');
      },
      editarPerfil: function (req, res){
        res.render ('editarPerfil');
      }
}

module.exports = controller