const express = require('express');
const uploadController = require('../controllers/upload');
const app = express();
const fileUpload = require('express-fileupload');

// middelware que captura todos los archivos que se estan subiendo
// y los pone dentro del objeto "files"
app.use(fileUpload({ useTempFiles: true }));

app.put('/upload/:type/:id', uploadController.upload);

module.exports = app;