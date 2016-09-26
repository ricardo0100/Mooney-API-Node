var mongoose = require('mongoose');

var accountSchema = mongoose.Schema({
  uuid: { type: String , unique: true, required: true },
  name: { type: String },
  removed: { type: Boolean, default: false }
}, { useNestedStrict: true, timestamps: true });

var model = mongoose.model('Account', accountSchema);

module.exports = model;
