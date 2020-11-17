const express = require('express');
const menuController = require('../controllers/menu');
const app = express();

app.get('/menu', menuController.list);
app.post('/menu', menuController.create);

module.exports = app;