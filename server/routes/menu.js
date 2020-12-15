const express = require('express');
const menuController = require('../controllers/menu');
const { checkToken, checkAdminRole } = require('../middlewares/authentication');
const app = express();

app.get('/menu', menuController.list);
app.get('/menu/:id', menuController.getById);
app.post('/menu', [checkToken, checkAdminRole], menuController.create);

module.exports = app;