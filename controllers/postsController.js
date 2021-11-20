const db = require("../database/models")

const controller = {
  detalle: async function(req, res) {
      const post = await db.Post.findByPk(req.params.id,{ 
        include: [
          { association: 'author' },
          { association: 'likes' },
          { association: 'comments', include: [{ association: 'author' }] }
        ]}
      )
      if (!post) {
        return res.render('error');
      }

      res.render('posts/detalle', { posteo });
      

      publish: function(req, res) {
        res.render('posts/publish');
      },
      store: function(req, res) {
        if (req.file) req.body.image = (req.file.destination + req.file.filename).replace('public', '');
        db.Post.create({
          ...req.body,
          user_id: req.session.user.id   //hacer sesión
        }).then(post => {
          res.redirect('/');
        }).catch(error => {
          return res.render(error);
        })
      },
      edit: async function(req, res) {
        const post = await db.Post.findByPk(req.params.id)
        if (!post) {
          return res.render('error');
        }
  
      
        db.Post.update(req.body, { where: { id: req.params.id }}).then(post => {
          res.redirect('/');
        }).catch(error => {
          return res.render(error);
        })
      },
      delete: function(req, res) {
        // Chequear que sea el owner
        db.Post.destroy({ where: { id: req.params.id }})
        .then(() => {
          res.redirect('/');
        }).catch(error => {
          return res.send(error);
        })
      },
      comment: function(req, res) {
        if (!req.session.user) {
          res.redirect('/posts/'+req.params.id);
        }
        db.Comment.create({
          ...req.body,
          post_id: req.params.id,
          user_id: req.session.user.id
        }).then(post => {
          res.redirect('/posts/'+req.params.id);
        }).catch(error => {
          return res.render(error);
        })
      },
      like: function(req, res) {
        if (!req.session.user) {
          res.redirect('/posts/'+req.params.id);
        }
        db.Like.create({
          user_id: req.session.user.id,
          post_id: req.params.id 
        }).then(like => {
          res.redirect('/posts/'+req.params.id);
        }).catch(error => {
          return res.send(error);
        })
      },
      dislike: function(req, res) {
        if (!req.session.user) {
          res.redirect('/posts/'+req.params.id);
        }
        db.Like.destroy(
          { where: { user_id: req.session.user.id, post_id: req.params.id }
        })
        .then(() => {
          res.redirect('/posts/'+req.params.id);
        }).catch(error => {
          return res.render(error);
        })
      },
  }


module.exports = controller