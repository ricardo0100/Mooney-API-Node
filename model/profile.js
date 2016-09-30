var mongoose = require('mongoose');

var profileSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String }
}, { timestamps: true });

var model = mongoose.model('Profile', profileSchema);

module.exports = model;
