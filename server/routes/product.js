const express = require('express');
const productController = require('../controllers/product');
const app = express();

app.get('/product', productController.list);
app.get('/product/category/:category', productController.getByCategory);
app.post('/product', productController.create);
app.put('/product/:id', productController.update);
app.delete('/product/:id', productController.remove);

module.exports = app;