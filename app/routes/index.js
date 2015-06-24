var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
 	// Angular Route  ==================================
    res.sendFile('app/template.htm', { root: __dirname }); // load the single view file (angular will handle the page changes on the front-end)
});

module.exports = router;
