const db = require("../database/models")
const bcrypt = require("bcryptjs")

let usersController = {

  registracion: function(req, res) {
    res.render('registracion');
    let errors = {},

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
  },


  login: function (req, res){
        res.render ('login');
        res.redirect('/');
      },

  processLogin: function(req,res){
    let errors = validationResult(req)

    if (errors.isEmpty()){
      let usersJSON = fs.readFileSync('users.json', { })
      let users
      if (usersJSON == "") {
        users = []
      } else {
        users = JSON.parse(usersJSON)
      }

      for (let i =0; i < users.length; i++){
        if (users[i].email == req.body.email) {
          if (bcrypt.compareSync(req.body.password, users[i].password)) {
            let usuarioALoguearse = users[i]
          }
        }
      }

      if (usuarioALoguearse == undefined) {
        return res.render ('login', {errors: [
          {msg: "Datos inválidos"}
        ]})
      }
      
      req.session.usuarioLogueado = usuarioALoguearse
      res.render("Éxitos!")

    } else {
      return res.render('login', { errors: errors.errors})
    }
  }

}

if (req.session.Usuario != undefined){
  return res.redirect('/')
} else {
  return res.render('login')
}


const controller = {
  miPerfil:  function(req, res) {
      
    db.Usuario.findByPk( req.params.id, { 
      include: [{ association: "posteos"     
      },{association:"comentarios"}],
      order:[["posteos","id","desc"]]
    })
    .then(data=>{
      
      res.render('miPerfil', {
        user: data
      });
      
    })
    
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
      
      editarPerfil: function (req, res){
        res.render ('editarPerfil');
      }
}

module.exports = controller