const express = require('express');
const userController = require('../controllers/user');
const app = express();

app.post('/register', userController.create);

module.exports = app;