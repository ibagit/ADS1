// For insert html tags
String.prototype.insert = function (index, string) {
    if (index > 0)
        return this.substring(0, index) + string + this.substring(index, this.length);
    else
        return string + this;
};

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

var insert = function(start, length, str) {
    var end = start + length+3;
    return str.insert(start, '<b>').insert(end, '</b>');
}

// Highlight matched terms
var highlight= function(data, parameters) {
    for (var key in parameters) {
        if (key === 'classification') continue;
        if (key === 'recalling_firm') continue;
        for (var i =0; i<parameters[key].length; i++) {
            var string = parameters[key][i].toLowerCase();
            if (string.length < 3) continue;
            for (var j=0; j<data.length; j++) {
                var text = data[j][key];
                var index = -1;
                index = text.toLowerCase().indexOf(string);

                while (index!==-1) {
                    text = insert(index, string.length, text);
                    index = text.toLowerCase().indexOf(string, index+4);
                }
                data[j][key] = text;
                data[j]['sort'] = parameters[key][i];
            }
        }
    }
}

// JSON API
app.post('/foodQuery', function(req, res) {

    // Declarations
    var limit='100';
    var queryString = '';
    var apiKey = 'B9T3uFvDs9jJdTxwJtamRfbOIj1iQnA41k0n91we'
    var base = 'https://api.fda.gov/food/enforcement.json?api_key='

    // Parse Request parameters
    var queryObj = qs.parse(req.body);

    // Initialize the query
    // recalling_firm:("Whole+Foods"+"Goya")
    queryString = base + apiKey + '&limit=' + limit + "&search=report_date=2015+AND+distribution_pattern:" + queryObj['distribution_pattern'] + "+AND+status:"+queryObj['status'];

    /*
    function joinPlus(element, index, array) {
        console.log(element);
        console.log(element.split(" ").join("+"));
        return element.split(" ").join("+")
    }*/

    // Build QueryString
    for (var key in queryObj['params'])
        queryString += '+AND+' + key + ':'+ "(\"" + queryObj['params'][key].join("\"+\"") + "\")";

    // Logging
    console.log('QueryString: ' + queryString);

    request(queryString, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            // Logging
            console.log(body);
            console.log('QueryString: ' + queryString);

            // Data
            var data = JSON.parse(body);

            // Highlight matched terms
            highlight(data['results'], queryObj['params']);

            // Return response
            res.json(JSON.stringify(data));
        } else {
            res.json(body);
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
//var httpsServer = https.createServer(credentials, app);

//httpServer.listen(5001);
httpServer.listen(8282);
//httpsServer.listen(5002);
//httpServer.listen(80);
//console.log("App listening on port 5000(http) and 5001(https)");
console.log("App listening on port 80(http)");
