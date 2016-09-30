var mongoose = require('mongoose');

var transactionSchema = mongoose.Schema({
  _id: { type: String },
  name: { type: String },
  removed: { type: Boolean, default: false },
  value: { type: Number },
  category: { type: Schema.Types.ObjectId, ref: 'Category' },
  account: { type: Schema.Types.ObjectId, ref: 'Account' }
}, { useNestedStrict: true, timestamps: true });

var model = mongoose.model('Category', categorySchema);

module.exports = model;
