const db = require("../database/models")
const bcrypt = require("bcryptjs")

const controller = {

//Registro

registracion: function (req, res){
  if (req.session.user){
    res.redirect('/')
  }
  res.render ('registracion');
},

processRegistracion: function(req,res){

  console.log(req.body)

  if (req.file){

    let errors = []
  
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
    if (!req.file) {
        errors.push('LA IMAGEN ES REQUERIDA');
    }
    if (!req.body.contraseña || req.body.contraseña.length < 3) {
        errors.push('LA CONSTRASEÑA NO PUEDE ESTAR VACÍA, NI SER MENOR A 3 CARACTERES');
    }
  
      if (errors.length > 0){
        return res.render('registracion', {errors: errors})
      } else {
        db.Usuario.create({
          nombre: req.body.nombre,
          email:req.body.email,
          nacimiento:req.body.nacimiento,
          contraseña: bcrypt.hashSync(req.body.contraseña, 10),
          telefono: req.body.telefono,
          imagen: req.body.imagen
        }).then(user => {
          req.session.user = user
  
          res.redirect('/')
        }
        )}
      }
    },

  

    //Detalle perfil


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
      
    //Editar perfil

   editarPerfil: function (req, res){
        res.render ('editarPerfil');
      },

      
       //Login

   login: function (req, res){
        if (req.session.user){
          res.redirect('/')
        }
        res.render ('login');
      },

   processLogin: function(req,res){
    db.Usuario.findOne({ where: {email: req.body.email}})
    .then(user=> {
      if (!user) {
        res.render('login',{error:"El mail es incorrecto"})
      }
      if (bcrypt.compareSync(req.body.contraseña, user.contraseña)) {
        req.session.user = user;
        res.cookie('user', user, { maxAge: 1000 * 60 * 60 * 24 * 30 })
        res.redirect('/');
      } else {
        res.render('login',{error:"La contraseña es incorrecta"})
      }
    })
       

  },
 

  logout: function (req, res){
    res.clearCookie('user');
      req.session.user = null;
      res.redirect('/')
  }

  }

module.exports = controller