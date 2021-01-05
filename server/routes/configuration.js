const express = require('express');
const configController = require('../controllers/configuration');
const app = express();

app.get('/config', configController.list);
app.post('/config', configController.create);
app.put('/config/:id', configController.update);

module.exports = app;