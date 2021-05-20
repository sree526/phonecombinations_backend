var express = require('express');
var cors = require('cors');
var combinations = require('./routes/combination');
var app = express();
app.use(cors());
app.use(express.json());
app.use('/combinations', combinations);
var server = app.listen(8080);


module.exports = server;
