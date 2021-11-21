var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require(`express-session`)
const db = require(`./database/models`)

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users'); 
var postsRouter = require('./routes/posts');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(
  session({
    secret: 'river',
    resave: false,
    saveUninitialized: true,
  }),
);
app.use((req, res, next) => {
  if (req.cookies.user != undefined && req.session.user == undefined) {
    // Pone en la sessión lo que está en la cookie SÓLO si la sesión está vacía
    req.session.user = req.cookies.user;
  }
  next();
});

// Middleware de Session
app.use((req, res, next) => {
  res.locals.app = {};
  if (req.session.user != undefined) {
    // Envia a todas las vistas la variable app.user
    res.locals.app.user = req.session.user;
  }
  next();
});
app.use('/', indexRouter);
app.use('/users', usersRouter); 
app.use('/posts', postsRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
