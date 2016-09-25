var mongoose = require('mongoose');
mongoose.promise = null;

var dbUri = process.env.MONGODB_URI || 'mongodb://localhost/mooney';
mongoose.connect(dbUri);
var db = mongoose.connection;

module.exports = db;
