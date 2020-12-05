const express = require('express');

const app = express();

app.use(require('./user'));
app.use(require('./login'));
app.use(require('./register'));
app.use(require('./product'));
app.use(require('./menu'));
app.use(require('./menuDetail'));
app.use(require('./pdf-generator'));

module.exports = app;