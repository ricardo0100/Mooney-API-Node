var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;

var app = express()

var apiRoute = require('./routes/api');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

passport.use(new BasicStrategy(
  function(username, password, done) {
    if (username === 'ricardo' && password === '123') {
      done(null, 'user-object');
    }
    done(null, false);
  }
));
app.use(passport.initialize());

app.use('/api', passport.authenticate('basic', { session: false }), apiRoute);

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
