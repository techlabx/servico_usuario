'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const app = require('./app') 

const PORT = process.env.PORT || 8080;
const HOST = '0.0.0.0';

app.listen(PORT, HOST);
console.log(`Servico Usuario running on http://localhost:${PORT}`);

