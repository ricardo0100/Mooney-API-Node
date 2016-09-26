var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.send('Mooney API');
});

var accountsRoute = require('../routes/accounts-api');
router.all('/accounts', accountsRoute);

module.exports = router;
