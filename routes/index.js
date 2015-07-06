var express = require('express');
var qs = require('qs');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
 	res.render('index.html')
});

router.post('/foodQuery', function(req, res) {
	console.log("Posting UP!!!");
    var qObj = qs.parse(req.body.query);
    var qString = '';
    for (var key in qObj)
      qString += key + ':'+ qObj[key] + '+';
    res.render('query_reports.html', {query_url: qString});
});

module.exports = router;

// URL
// https://api.fda.gov/food/enforcement.json?limit=5&search=<%= query_url %>
