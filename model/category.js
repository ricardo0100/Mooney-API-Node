var mongoose = require('mongoose');

var categorySchema = mongoose.Schema({
  _id: { type: String },
  name: { type: String },
  removed: { type: Boolean, default: false }
}, { useNestedStrict: true, timestamps: true });

var model = mongoose.model('Category', categorySchema);

module.exports = model;
