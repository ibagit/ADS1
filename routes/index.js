var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index.html')
});
router.post('/foodQuery', function(req, res) {
    res.render('query_reports.html', {query_url: req.body.query});
});

module.exports = router;
