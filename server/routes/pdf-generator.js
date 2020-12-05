const express = require('express');
const pdfController = require('../controllers/pdf-generator');
const app = express();

app.post('/pdf', pdfController.create);

module.exports = app;