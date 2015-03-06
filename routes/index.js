var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var title = "Welcome to Energy Conservation Project";
  res.render('index', { title: title });
});

module.exports = router;
