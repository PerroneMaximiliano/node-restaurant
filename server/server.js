require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { mongoDBConnection } = require('./database/config');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(path.resolve(__dirname, '../public')));

app.use(require('./routes/index'));

app.listen(process.env.PORT, () => {
    console.log("Listening requests in the port 3000");
    mongoDBConnection();
});