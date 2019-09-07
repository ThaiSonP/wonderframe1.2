var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require("cookie-parser");
var logger = require('morgan');

var bodyParser = require('body-parser');
const session = require ('express-session');
const passport = require('./auth/local')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var pinsRouter = require('./routes/pins');
var boardsRouter = require('./routes/boards');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser("secret"));
app.use(express.static(path.join(__dirname, "client/build")));

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true
  })
);

app.use(passport.initialize());
app.use(passport.session());


app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/pins', pinsRouter);
app.use('/boards', boardsRouter);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "../frontend/build/index.html"));
});

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
