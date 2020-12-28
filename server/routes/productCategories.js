const express = require('express');
const productCategoryController = require('../controllers/productCategories');
const app = express();

app.get('/product-categories', productCategoryController.list);
app.delete('/product-categories/:id', productCategoryController.remove);
app.post('/product-categories', productCategoryController.create);
app.put('/product-categories/:id', productCategoryController.update);

module.exports = app;