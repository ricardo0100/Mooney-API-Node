var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.send('Mooney API');
});

var accountsRoute = require('../api/accounts');
var categoriesRoute = require('../api/categories');
router.all('/accounts', accountsRoute);
router.all('/categories', categoriesRoute);

module.exports = router;
