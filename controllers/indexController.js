const db = require("../database/models")
const controller = {
    index: function(req, res) {
db.Posteo.findAll({
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
  res.render('index', { title: 'Express', posts: data}); 
  
})
    }, 
    result: function (req, res){
      res.render ('resultadoBusqueda', { title: 'Express', posts: posts.list });
    }
    
};

module.exports = controller;