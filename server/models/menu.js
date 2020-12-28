const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let menuSchema = new Schema({
    description: {
        type: String,
        required: [true, 'The description is required']
    },
    finished_time: {
        type: Number,
        required: [true, 'The finished_time is required'],
    },
    price: {
        type: String,
        required: [true, 'The price is required']
    },
    img: {
        type: String,
        required: [false]
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'MenuCategories',
        required: true
    },
});

module.exports = mongoose.model('Menu', menuSchema);