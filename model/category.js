var mongoose = require('mongoose');
var baseSchema = require('../model/baseSchema');

var categorySchema = baseSchema.createSchema({ 
    name: { type: String }
});

var model = mongoose.model('Category', categorySchema);

module.exports = model;
