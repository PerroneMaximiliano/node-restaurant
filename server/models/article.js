const mongoose = require('mongoose');

let Schema = mongoose.Schema;
let articleSchema = new Schema({
    description: {
        type: String,
        required: [true, 'The description is required']
    },
    finished_time: {
        type: Number,
        required: [true, 'The finished_time is required'],
    },
    price: {
        type: Number,
        required: [true, 'The price is required']
    }
});

module.exports = mongoose.model('Article', articleSchema);