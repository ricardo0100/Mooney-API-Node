var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.send('Mooney API');
});

var accountsRoute = require('../api/accounts');
var categoriesRoute = require('../api/categories');
var transactionsRoute = require('../api/transactions');
router.all('/accounts', accountsRoute);
router.all('/categories', categoriesRoute);
router.all('/transactions', transactionsRoute);

module.exports = router;
