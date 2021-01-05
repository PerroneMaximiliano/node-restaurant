const express = require('express');
const emailController = require('../controllers/email');
const app = express();

app.post('/send-email', emailController.send);

module.exports = app;