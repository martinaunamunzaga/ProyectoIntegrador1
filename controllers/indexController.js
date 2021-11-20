const db = require("../database/models")
const op = db.Sequelize.Op
const controller = {
  index: function (req, res) {
    db.Posteo.findAll({
        include: [{
          association: 'usuario'
        }, {
          association: 'comentarios',
          include: {
            association: 'usuario'
          },
          limit: 2
        }],
        order: [
          ['created_at', 'desc']
        ]
      })
      .then(data => {
        res.render('index', {
          title: 'Express',
          posts: data
        });

      })
  },
  result: function (req, res) {
    res.render('resultadoBusqueda', {
      title: 'Express',
      posts: posts.list
    });
  },
  resultUser: function (req, res) {
    db.Usuario.findAll({
      include: [{
        association: "posteos"
      }, {
        association: "comentarios"
      }],
      where: {
        [op.or]: [{
          nombre: {
            [op.like]: "%" + req.query.search + "%",
          },
        }, {
          email: {
            [op.like]: "%" + req.query.search + "%",
          },
        }],
      }})
      .then(data => {
        res.render("resultadoBusquedaUser", {
          users: data
        })
      })
    
  }
};

module.exports = controller;