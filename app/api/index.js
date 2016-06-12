var express = require('express');
var app = express();

module.exports = app;

app.use(require('./article'));
app.use(require('./comment'));
app.use(require('./user'));
