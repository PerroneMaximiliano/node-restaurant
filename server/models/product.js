const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let productSchema = new Schema({
    description: {
        type: String,
        required: [true, 'The description is required']
    },
    purchase_price: {
        type: Number,
        required: [true, 'The purchase_price is required'],
    },
    sale_price: {
        type: Number,
        required: [true, 'The sale_price is required']
    },
    current_stock: {
        type: Number,
        default: 0,
        required: [true, 'The current_stock is required']
    },
    min_stock: {
        type: Number,
        default: 0,
        required: [true, 'The min_stock is required']
    },
    unit_measurement: {
        type: String,
        required: [true, 'The unit_measurement is required']
    },
    supplies: {
        type: Boolean,
        default: false
    },
    status: {
        type: Boolean,
        default: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'ProductCategories',
        required: false
    }
});

module.exports = mongoose.model('Product', productSchema);