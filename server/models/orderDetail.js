const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let orderDetailSchema = new Schema({
    quantity: {
        type: Number,
        required: [true, 'The quantity is required']
    },
    subTotal: {
        type: Number,
        required: [true, 'The subtotal is required'],
    },
    status: {
        type: Boolean,
        default: true
    },
    order: {
        type: Schema.Types.ObjectId,
        ref: 'Order',
        required: true
    },
    menu: {
        type: Schema.Types.ObjectId,
        ref: 'Menu',
        required: false
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: false
    },
});

module.exports = mongoose.model('OrderDetail', orderDetailSchema);