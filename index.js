var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var authentication = require('./middlewares/authentication');
var mongoose = require('mongoose');
var Profile = require('./model/profile');

var app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(authentication.initialize());

var dbUri = process.env.MONGODB_URI || 'mongodb://localhost/mooney';
mongoose.connect(dbUri);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  Profile.findByUsername('ricardo').exec(function(err, profile) {
    if (!profile) {
      var newProfile = new Profile({
          name: 'Ricardo',
          username:'ricardo',
          password:'96cae35ce8a9b0244178bf28e4966c2ce1b8385723a96a6b838858cdd6ca0a1e'
        }).save();
    }
  });
});

var apiRoute = require('./routes/api');
app.use('/api', authentication.authenticate('basic', { session: false }), apiRoute);

var port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log('Example app listening on port ' + port);
});
