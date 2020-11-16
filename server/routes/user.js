const express = require('express');
const userController = require('../controllers/user');
const { checkToken } = require('../middlewares/authentication');
const app = express();

app.get('/user', checkToken, userController.list);
app.post('/user', checkToken, userController.create);
app.put('/user/:id', checkToken, userController.update);
app.delete('/user/:id', checkToken, userController.remove);

module.exports = app;