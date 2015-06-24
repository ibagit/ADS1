// Initialize
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var mylogger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');
var request = require('request');

//HTTPS credentials
var http = require('http');
var https = require('https');

var privateKey  = fs.readFileSync('certificates/server.key', 'utf8');
var certificate = fs.readFileSync('certificates/server.crt', 'utf8');

var credentials = {key: privateKey, cert: certificate};


// Routing & API
var qs = require('qs');
var router = express.Router();

// Instantiate
var app = express();

// Attach the routes.
var routes = require('./routes/index');
var query_reports = require('./routes/query_reports');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.engine('htm', require('ejs').renderFile);
app.set('view engine', 'ejs');

// ==================configuration =================
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(mylogger('dev'));
app.use(bodyParser.json());
//app.use(bodyParser.urlencoded());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'app')));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));
app.use(express.static('data'));
//app.use(bodyParser.json({limit: '50mb'}));
//app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

// Make our db accessible to our router
app.use(function(req,res,next){
    //console.log(req.body);
    next();
});
//

// Angular Route 
// Load the single view file (Angular handles the page changes on the front-end)
app.get('/', function(req, res) {
    console.log("Loading Template");
    res.sendfile('app/template.htm'); 
});

// JSON API
app.post('/foodQuery', function(req, res) {
    // Declarations
    var limit='10';
    var queryString = '';
    var base = 'https://api.fda.gov/food/enforcement.json?'

    // Parse Request parameters
    var queryObj = qs.parse(req.body);

    // Initialize the query
    queryString = base + 'limit=' + limit + "&search=state:\"" + queryObj['state'] + "\""

    // Build QueryString
    for (var key in queryObj['params'])
        queryString += '+AND+' + key + ':'+ "\"" + queryObj['params'][key] + "\"";

    console.log(queryString);

    request(queryString, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log("Success");
            console.log(body);
            res.json(body);
        } else {
            console.log("Error: " + error);
        }
    });
});

// Error handling
app.get('*', function(req, res, next) {
    console.log("404 error!");
    var err = new Error();
    err.status = 404;
    next(err);
});

// Extra
app.use('/query_reports', query_reports);



/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('404.html', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('404.html', {
        message: err.message,
        error: {}
    });
});

// listen (start app with node food_safety_recall.js)
module.exports = app; 

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);


httpServer.listen(5001);

//httpServer.listen(80);
httpsServer.listen(5002);

console.log("App listening on port 5000(http) and 5001(https)");