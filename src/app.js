const express = require('express');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ type: 'application/vnd.api+json' }));

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

const mainRoute = require(__dirname + '/routes/main.routes.js');
app.use('/', mainRoute);

module.exports = app;
