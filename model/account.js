var mongoose = require('mongoose');
var baseSchema = require('../model/baseSchema');

var accountSchema = baseSchema.createSchema({ 
    name: { type: String }
});

var model = mongoose.model('Account', accountSchema);

module.exports = model;