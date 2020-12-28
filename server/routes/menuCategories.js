const express = require('express');
const menuCategoryController = require('../controllers/menuCategories');
const app = express();

app.get('/menu-categories', menuCategoryController.list);
app.delete('/menu-categories/:id', menuCategoryController.remove);
app.post('/menu-categories', menuCategoryController.create);
app.put('/menu-categories/:id', menuCategoryController.update);

module.exports = app;