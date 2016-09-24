var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var authentication = require('./middlewares/authentication');

var app = express();

var apiRoute = require('./routes/api');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(authentication.initialize());

app.use('/api', authentication.authenticate('basic', { session: false }), apiRoute);

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
