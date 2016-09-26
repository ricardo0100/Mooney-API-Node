var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

var dbUri = process.env.MONGODB_URI || 'mongodb://localhost/mooney';
mongoose.connect(dbUri);
var db = mongoose.connection;

module.exports = db;
