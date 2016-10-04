var express = require('express');
var router = express.Router();
var async = require('async')
var Account = require('../../model/account');

router.get('/accounts', function(request, response, next) {
  Account.find({ removed: false }).exec()
  .then(function(accounts) {
    response.json(accounts);
  })
  .then(function(error) {
    next(error);
  });
});

router.post('/accounts', function(request, response, next) {
  var inserts = [];
  var updates = [];
  var errors = [];
  
  async.each(request.body, function iteratee(account, callback) {

    var newAccount = new Account(account);
    var validationError = newAccount.validateSync();
    if(validationError) {
      errors.push({ key: account._id, value: validationError.errors });
      callback();
    } else {
      Account.findOneAndUpdate({ _id: newAccount._id }, newAccount, { upsert: true })
      .then(function(document) {
        if(document) {
          updates.push(account._id);
        } else {
          inserts.push(account._id);
        }
      })
      .then(function(err) {
        if(err) {
          errors.push({ key: account._id, value: err });
        }
        callback(err);
      });
    }
    
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
