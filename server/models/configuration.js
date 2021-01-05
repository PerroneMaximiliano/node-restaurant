const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let configSchema = new Schema({
    quantityCooks: {
        type: Number,
        required: [true, 'The quantity cooks is required']
    },
    email: {
        type: String,
        required: [true, 'The company email is required'],
    },
    password: {
        type: String,
        required: [true, 'The password of email is required'],
    },
});

module.exports = mongoose.model('Configuration', configSchema);