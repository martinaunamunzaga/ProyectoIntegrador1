const db = require("../database/models")
const controller = {

  post: function (req, res) {
    db.Posteo.findByPk( req.params.id, { 
      include: [{
        association: 'usuario'
      },{
        association: 'comentarios',
        include: {
          association: 'usuario'
        }
      }],
      order: [['created_at','desc']]
    })
    .then(data=>{
      res.render('detallePost', {
        post: data
      });
      
    })
    
  },

  //Crear nuevo posteo

  agregarPost: function (req, res) {
    db.Posteo.create({
      descripcion: req.body.descripcion,
      imagen: `/images/products/${req.file.filename}`,
      usuario_id: req.session.user.id,
    }).then(post =>{
      res.redirect('/')    
    }).catch(error => {
      return res.send(error)
    })  
  }, 
  
  nuevoPost: function(req, res){
    if(req.session.user){
      res.render('agregarPost')
    } else{
      res.redirect('/')
    }
  },
  
  //faltaria que se guarde automaticamente la fecha de creadion del posteo


  //Comentar posteo

  comentar: function (req, res){
    if (!req.session.user) {
      res.redirect('/posts/detail/'+req.params.id);
    }
    db.Comentario.create({
      ...req.body,
      posteo_id: req.params.id,
      usuario_id: req.session.user.id
    }).then(post => {
      res.redirect('/posts/detail/'+req.params.id);
    }).catch(error => {
      return res.render(error);
    })
  },

}




module.exports = controller