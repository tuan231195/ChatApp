var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var bodyParser = require('body-parser');
require('dotenv').config({silent: true});
require('./server/model/db');
require('./server/config/passport');


var authentication = require('./server/routes/authentication');
var profile = require("./server/routes/profile");
var chat = require("./server/routes/chat");

var app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());

// app.use('/', routes);
app.use('/auth', authentication);
app.use('/profile', profile);
app.use('/chat', chat);

app.use(function (req, res) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        console.error(err);
        res.status(err.status || 500);
        res.json({
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    console.error(err);
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: {}
    });
});

var http = require('http').Server(app);
try {
    require("./server/controllers/socket.io")(http);
}
catch (exception) {
    console.error(exception);
}


http.listen(8080, function () {
    "use strict";
    console.log("Server started at 8080");
});
