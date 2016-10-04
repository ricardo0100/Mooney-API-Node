var mongoose = require('mongoose');

var accountSchema = mongoose.Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  removed: { type: Boolean, default: false }
}, { useNestedStrict: true, timestamps: { createdAt: 'created_at', updatedAt:  'updated_at' } });

accountSchema.pre('findOneAndUpdate', function(next) {
  
  next();
});

var model = mongoose.model('Account', accountSchema);

module.exports = model;
