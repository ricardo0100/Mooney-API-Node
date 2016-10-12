var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');

var authentication = require('./middlewares/authentication');
var db = require('./middlewares/database');

var app = express();
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(authentication.initialize());

var handlebars = require('handlebars');
var fs = require('fs');
app.engine('handlebars', function (filePath, context, callback) {
  fs.readFile(filePath, function (err, content) {
    if (err) return callback(new Error(err));
    var template = handlebars.compile(content.toString());
    var rendered = template(context);
    return callback(null, rendered);
  });
});
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

var Profile = require('./model/profile');

//Start database
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(err, profile) {
  
  //API
  var api = require('./routes/api/api');
  app.use('/api', authentication.authenticate('basic', { session: false }), api);

  //Site
  var site = require('./routes/site/home');
  app.use('/', site);

  //Start server
  var port = process.env.PORT || 3000;
  app.listen(port, function () {
    console.log('Mooney listening on port ' + port);
  });

  //default user
  Profile.find({ username: 'ricardo' }, function(err, profile) {
    if (!profile.length) {
      console.log('Created Ricardo');
      var newProfile = new Profile({
          name: 'Ricardo',
          username:'ricardo',
          password:'e96ac6b2cda967f55a627f202986d5d12865b93d59cfaf1fe6f91b0bae623a81'
        }).save();
    }
  });
});
