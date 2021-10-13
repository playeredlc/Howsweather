const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

const mainRoute = require(__dirname + '/routes/main.routes.js');
app.use('/', mainRoute);

module.exports = app;