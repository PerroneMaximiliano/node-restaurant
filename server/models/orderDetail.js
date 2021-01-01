const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let orderDetailSchema = new Schema({
    quantity: {
        type: Number,
        required: [true, 'The quantity is required']
    },
    description: {
        type: String,
        required: [true, 'The description is required']
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
    }
});

module.exports = mongoose.model('OrderDetail', orderDetailSchema);