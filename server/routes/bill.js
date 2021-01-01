const express = require('express');
const billController = require('../controllers/bill');
const app = express();

app.get('/bill', billController.list);
app.post('/bill', billController.create);
app.put('/bill/:id', billController.update);
app.delete('/bill/:id', billController.remove);

module.exports = app;