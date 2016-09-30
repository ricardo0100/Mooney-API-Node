var express = require('express');
var router = express.Router();

var Category = require('../../model/category');

router.get('/categories', function(request, response, next) {
  Category.find({}).exec()
  .then(function(category) {
    response.json(category);
  })
  .then(function(error) {
    next(error);
  });
});

router.post('/categories', function(request, response, next) {
  for (var index in request.body) {
    var category = request.body[index];
    Category.update({ uuid: category.uuid }, category, { upsert: true }).exec()
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
