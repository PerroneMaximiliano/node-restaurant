const express = require('express');

const app = express();

app.use(require('./user'));
app.use(require('./login'));
app.use(require('./register'));
app.use(require('./product'));
app.use(require('./menu'));
app.use(require('./menuDetail'));
app.use(require('./pdf-generator'));
app.use(require('./upload'));
app.use(require('./image'));
app.use(require('./menuCategories'));
app.use(require('./productCategories'));
app.use(require('./order'));
app.use(require('./orderDetail'));
app.use(require('./bill'));
app.use(require('./configuration'));
app.use(require('./email'));

module.exports = app;