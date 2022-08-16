var createError = require('http-errors');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var app = express();
// view engine setup
app.set('views', path.join(__dirname, '/'));
app.set('view engine', 'ejs');
app.get('/', function(req, res) {
    res.render('index');
});



  

exports.app = app;
