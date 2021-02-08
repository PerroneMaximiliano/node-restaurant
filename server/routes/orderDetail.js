const express = require('express');
const orderDetailController = require('../controllers/orderDetail');
const app = express();

app.get('/order-detail', orderDetailController.list);
app.post('/order-detail', orderDetailController.create);
app.put('/order-detail/:id', orderDetailController.update);
app.delete('/order-detail/:id', orderDetailController.remove);
app.get('/order-detail-rank', orderDetailController.rank);

module.exports = app;