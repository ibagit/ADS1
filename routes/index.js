var express = require('express');
var qs = require('qs');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index.html')
});
router.post('/foodQuery', function(req, res) {
    var qObj = qs.parse(req.body.query);
    var qString = '';
    for (var key in qObj)
      qString += key + ':'+ qObj[key] + '+';
    console.log(qString);
    res.render('query_reports.html', {query_url: qString});
});

module.exports = router;
