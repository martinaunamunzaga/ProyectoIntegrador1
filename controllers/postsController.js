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
        },
        limit: 2
      }],
      order: [['created_at','desc']]
    })
    .then(data=>{
      
      res.render('detallePost', {
        post: data
      });
      
    })
    
  },
  agregarPost: function (req, res) {
    res.render('agregarPost');
  }
}




module.exports = controller