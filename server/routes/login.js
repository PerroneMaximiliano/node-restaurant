const express = require('express');
const loginController = require('../controllers/login');
const app = express();

app.post('/login', loginController.login);
app.post('/login-google', loginController.loginGoogle);

module.exports = app;