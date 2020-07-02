const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();

const usuario = require('./api/usuario');


var corsOptions = {
  origin: function (origin, callback) {
    callback(null, true)
  }
}

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors(corsOptions));
app.use(cookieParser());

//Mounting the route
app.use('/usuarios', usuario);

module.exports = app;
