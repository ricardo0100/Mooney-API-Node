var express = require('express');
var router = express.Router();

var Account = require('../../model/account');

router.get('/accounts', function(request, response, next) {
  Account.find({}).exec()
  .then(function(accounts) {
    response.json(accounts);
  })
  .then(function(error) {
    next(error);
  });
});

router.post('/accounts', function(request, response, next) {
  for (var index in request.body) {
    var account = request.body[index];
    Account.update({ uuid: account.uuid }, account, { upsert: true }).exec()
    .then(function(raw) {
      response.status(200);
      response.send(raw);
    })
    .then(function(error) {
      response.status(400);
      next(error);
    });
  }
});

module.exports = router;
