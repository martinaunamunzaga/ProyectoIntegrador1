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

    let errors = {}
  
    if (!req.body.nombre) {
      errors.message ='Faltan datos, por favor complete todos los campos';
      res.locals.errors = errors;

        return res.render('registracion')
    }
    if (!req.body.email) {
      errors.message = 'Faltan datos, por favor complete todos los campos';
      res.locals.errors = errors;

                return res.render('registracion')
    }
    if (!req.body.nacimiento) {
      errors.message = 'Faltan datos, por favor complete todos los campos';
      res.locals.errors = errors;

                return res.render('registracion')
    }
    if (!req.body.telefono) {
      errors.message = 'Faltan datos, por favor complete todos los campos';
      res.locals.errors = errors;

                return res.render('registracion')
    }
    if (!req.file) {
        errors.message = 'Faltan datos, por favor complete todos los campos';
        res.locals.errors = errors;

                return res.render('registration')
    }
    if (!req.body.contraseña || req.body.contraseña.length < 3) {
        errors.message ='LA CONSTRASEÑA NO PUEDE ESTAR VACÍA, NI SER MENOR A 3 CARACTERES';
        res.locals.errors = errors;

                return res.render('registracion')
    }
  
      if (errors.length > 0){
      } else {
        req.body.imagen = (req.file.destination + req.file.filename).replace('../public', '');
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
    let errors = {}
    db.Usuario.findOne({ where: {email: req.body.email}})
    .then(user=> {
      if (!user) {
        errors.message="Los datos son incorrectos";
          res.locals.errors=errors;
          return res.render("login")
      }
      if (bcrypt.compareSync(req.body.contraseña, user.contraseña)) {
        req.session.user = user;
        res.cookie('user', user, { maxAge: 1000 * 60 * 60 * 24 * 30 })
        res.redirect('/');
      } else {
        errors.message="Los datos son incorrectos";
        res.locals.errors=errors;
        return res.render("login")
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