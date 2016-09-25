var mongoose = require('mongoose');

var profileSchema = mongoose.Schema({
  username: 'String',
  password: 'String',
  name: 'String'
});

profileSchema.statics.findByUsername = function(username, callback) {
  return this.findOne({ username: username }, callback);
};

module.exports = mongoose.model('Profile', profileSchema);
