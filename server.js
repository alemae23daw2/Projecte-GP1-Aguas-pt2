const express = require('express');
var path = require('path');
var logger = require('morgan');
const cookieParser = require('cookie-parser'); 
var routes = require('./routes');

const mongoose = require('mongoose');
mongoose.set('debug', true);

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

app.get('/', routes.index);
app.get('/homeusr', function(req, res) {
    res.render('homeusr'); 
});

app.get('/desalinitzadores', function(req, res) {
    res.render('desalinitzadores');
});
app.get('/nigeria', function(req, res) {
    res.render('nigeria');
});
app.get('/australia', function(req, res) {
    res.render('australia');
});
app.get('/comparacio', function(req, res) {
    res.render('comparacio');
});
app.get('/plan', function(req, res) {
    res.render('plan');
});
app.get('/contacte', function(req, res) {
    res.render('contacte');
});

app.get('/logout', routes.logout());
app.post('/afegir', routes.afegir());
app.post('/login', routes.login());
app.post('/loginAdmin', routes.loginAdmin());



app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;