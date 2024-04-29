const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser'); 
const https = require('https');
const fs = require('fs');
const routes = require('./routes');

const mongoose = require('mongoose');
mongoose.set('debug', true);

const app = express();

// Configuración del motor de vistas y middleware
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

// Definición de rutas
app.get('/', routes.index);
app.get('/homeusr', function(req, res) {
    res.render('homeusr'); 
});
app.get('/homeadmin', function(req, res) {
    res.render('homeadmin'); 
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
app.get('/contacte', function(req, res) {
    res.render('contacte');
});

app.get('/planta', function(req, res) {
    res.render('planta'); 
});
app.get('/logout', routes.logout());
app.post('/afegir', routes.afegir());
app.post('/login', routes.login());
app.post('/loginAdmin', routes.loginAdmin());

// Middleware para manejar errores 404
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// Middleware para manejar errores en desarrollo
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// Middleware para manejar errores en producción
app.use(function(err, req, res, next) {
    res.render('error', {
        message: err.message,
        error: {}
    });
});

// Configuración del servidor HTTPS
const httpsOptions = {
    key: fs.readFileSync('localhost-key.pem'),
    cert: fs.readFileSync('localhost.pem')
};

https.createServer(httpsOptions, app).listen(443, () => {
    console.log('Servidor HTTPS iniciado en el puerto 443');
});

module.exports = app;
