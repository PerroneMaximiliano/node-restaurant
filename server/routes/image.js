const express = require('express');
const imageController = require('../controllers/image');
let app = express();

app.get('/image/:type/:img', imageController.getById);

module.exports = app;