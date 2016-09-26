var mongoose = require('mongoose');

var profileSchema = mongoose.Schema({
  username: 'String',
  password: 'String',
  name: 'String',
}, { timestamps: true });

var model = mongoose.model('Profile', profileSchema);

module.exports = model;
