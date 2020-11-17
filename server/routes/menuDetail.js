const express = require('express');
const menuDetailController = require('../controllers/menuDetail');
const app = express();

app.get('/menu-detail', menuDetailController.list);
app.post('/menu-detail', menuDetailController.create);

module.exports = app;