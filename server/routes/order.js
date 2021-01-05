const express = require('express');
const orderController = require('../controllers/order');
const app = express();

app.get('/order/:status?', orderController.list);
app.post('/order', orderController.create);
app.put('/order/:id', orderController.update);

module.exports = app;