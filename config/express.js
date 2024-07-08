
var express = require('express'),
    bodyParser = require('body-parser');
    consign = require('consign');
    cors = require('cors');
    path = require('path');
var app = express();

app.use(bodyParser.urlencoded({ extended : true }))
app.use(bodyParser.json());
app.set('secret', 'api-nodejs');

consign()
    .include('config/database.js')
    .then('app/app.controller.js')
    .into(app);

module.exports = app;