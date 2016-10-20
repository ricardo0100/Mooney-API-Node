var mongoose = require('mongoose');
var baseSchema = require('../model/baseSchema');

var categorySchema = baseSchema.createSchema({ 
    name: { type: String, required: true }
});

var model = mongoose.model('Category', categorySchema);

module.exports = model;
