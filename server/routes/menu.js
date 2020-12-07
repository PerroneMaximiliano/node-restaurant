const express = require('express');
const menuController = require('../controllers/menu');
const app = express();

app.get('/menu', menuController.list);
app.get('/menu/:id', menuController.getById);
app.post('/menu', menuController.create);

module.exports = app;