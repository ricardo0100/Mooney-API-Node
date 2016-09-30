var express = require('express');
var router = express.Router();

router.get('/', function(request, response, next) {
  response.render('home', {
    title: 'Mooney',
    numbers: [{ num: 'One' }, { num: 'Two' }, { num: 'Three' }],
    address: {
      street: 'Rua dos bobos'
    }
  });
});

module.exports = router;