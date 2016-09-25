var sha256 = require('js-sha256');
var Profile = require('../model/profile');

var auth = function() {
  var passport = require('passport');
  var BasicStrategy = require('passport-http').BasicStrategy;

  passport.use(new BasicStrategy(
    function(username, password, done) {
      Profile.findByUsername(username).exec(function(err, profile) {
        if (err) { return done(err); }
        if (!profile) { return done(null, false); }
        if (profile.password === sha256(password)) {
          return done(null, profile);
        } else {
          return done(null, false);
        }
      });
    }
  ));

  return passport;
};

module.exports = auth();
