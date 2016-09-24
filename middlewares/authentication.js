var auth = function() {
  var passport = require('passport');
  var BasicStrategy = require('passport-http').BasicStrategy;

  passport.use(new BasicStrategy(
    function(username, password, done) {
      if (username === 'ricardo' && password === '123') {
        done(null, 'user-object');
      }
      done(null, false);
    }
  ));

  return passport;
};

module.exports = auth();
