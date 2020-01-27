const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const hbs = require('express-handlebars');

const mongoStore = require('./mongodb');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

// view engine setup
app.engine('hbs', hbs({extname: 'hbs'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  name: 'DevilishDelights',
  secret: 'keyboard cat', //meow meow
  resave: false,
  saveUninitialized: false,
  store: mongoStore,
  cookie: {secure: false}
}));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
