const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let menuDetailSchema = new Schema({
    quantity: {
        type: Number,
        required: [true, 'The quantity is required'],
    },
    unit_measurement: {
        type: String,
        required: [true, 'The unit_measurement is required']
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    menu: {
        type: Schema.Types.ObjectId,
        ref: 'Menu',
        required: true
    }
});

module.exports = mongoose.model('MenuDetail', menuDetailSchema);