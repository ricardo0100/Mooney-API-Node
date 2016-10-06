var express = require('express');
var router = express.Router();
var async = require('async')
var Account = require('../../model/account');

router.get('/accounts', function(request, response, next) {
  Account.findAllForUser(request.user, function(err, accounts) {
    if(err) {
      response.status(500);
      response.send(err);
    } else {
      response.status(200);
      response.send(accounts);
    }
    next();
  });
});

router.post('/accounts', function(request, response, next) {
  var inserts = [];
  var updates = [];
  var errors = [];
  
  async.each(request.body, function iteratee(account, callback) {
    account.profile = request.user;
    Account.upsert(account, function(err, isUpdate) {
      if (err) {
        errors.push({ key: account._id, value: err });
      } else if (isUpdate) {
        updates.push(account._id);
      } else {
        inserts.push(account._id);
      }
      callback();
    });

  }, function(err) {

    if(err) {
      response.status(400);
      response.send(err);
      next(err);
    } else {
      response.status(200);
      response.send({
        inserted: inserts,
        updated: updates,
        errors: errors
      });
      next();
    }

  });

});

module.exports = router;
