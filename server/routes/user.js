const express = require('express');
const userController = require('../controllers/user');
const { checkToken } = require('../middlewares/authentication');
const app = express();

app.get('/user', userController.list);
app.post('/user', userController.create);
app.put('/user/:id', checkToken, userController.update);
app.delete('/user/:id', checkToken, userController.remove);
app.get('/user/search/:words', userController.search);

module.exports = app;