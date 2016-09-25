//node_modules
var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');


//modules
var authentication = require('./middlewares/authentication');
var Profile = require('./model/profile');
var db = require('./middlewares/database');

var app = express();
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(authentication.initialize());


db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(err, profile) {
  Profile.findByUsername('ricardo', function() {
    if (!profile) {
      var newProfile = new Profile({
          name: 'Ricardo',
          username:'ricardo',
          password:'e96ac6b2cda967f55a627f202986d5d12865b93d59cfaf1fe6f91b0bae623a81'
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
