var mongoose = require('mongoose');

var createSchema = function(fields) {
  var schemaFields = {
    _id: { type: String, required: true },
    name: { type: String, required: true },
    removed: { type: Boolean, default: false },
    profile: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile', required: true }
  };

  for(property in fields) {
    schemaFields[property] = fields[property];
  }
  
  var schema = mongoose.Schema(schemaFields, { useNestedStrict: true, timestamps: { createdAt: 'created_at', updatedAt:  'updated_at' } });
  
  schema.statics.findAllForUser = function(user, callback) {
    this.find({ profile: user }).exec()
    .then(function(accounts) {
      callback(null, accounts);
    })
    .then(function(error) {
      if(error) {
        callback(error, null);
      }
    });
  };

  schema.statics.upsert = function(object, callback) {
    var newObject = new this(object);
    var validationError = newObject.validateSync();
    if(validationError) {
      callback(validationError, null);
    } else {
      this.findOneAndUpdate({ _id: newObject._id }, newObject, { upsert: true })
      .then(function(document) {
        if (document) {
          callback(null, true);
        } else {
          callback(null, false);
        }
      })
      .then(function(err) {
        if(err) {
          callback(err, null);
        }
      });
    }
  };
  
  return schema;
};

module.exports.createSchema = createSchema;
