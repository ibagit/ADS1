var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var mylogger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');

var http = require('http');
var https = require('https');

var app = express();

// Attach the routes.
var routes = require('./routes/index');
var query_reports = require('./routes/query_reports');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(mylogger('dev'));
app.use(bodyParser.json());
//app.use(bodyParser.urlencoded());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'assets')));
// files
app.use(express.static('data'));


//app.use(bodyParser.json({limit: '50mb'}));
//app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

// Make our db accessible to our router
app.use(function(req,res,next){
    //console.log(req.body);
    next();
});
//
app.use('/', routes);
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

module.exports = app; 
var httpServer = http.createServer(app);
//var httpsServer = https.createServer(credentials, app);


httpServer.listen(5000);

//httpServer.listen(80);
//httpsServer.listen(443);
