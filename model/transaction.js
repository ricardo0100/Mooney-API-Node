var mongoose = require('mongoose');
var baseSchema = require('../model/baseSchema');

var transactionSchema = baseSchema.createSchema({
  name: { type: String, required: true },
  value: { type: Number, required: true },
  type: { type: String, required: true },
  category_id: { type: String, required: true },
  account_id: { type: String, required: true }
}, { useNestedStrict: true, timestamps: true });

var model = mongoose.model('Transaction', transactionSchema);

module.exports = model;
