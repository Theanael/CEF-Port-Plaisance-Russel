const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieSession = require('cookie-session');

const indexRouter = require('./routes/index');

const mongodb = require('./db/mongo')

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./doc/swagger');

mongodb.initClientDbConnection()

const app = express();



app.use(cookieSession({
    name: 'session',
    keys: [process.env.SECRET_KEY],
    maxAge: 24 * 60 * 60 * 1000
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerSpec))


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
