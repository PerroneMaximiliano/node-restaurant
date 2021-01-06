const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let status = {
    values: ['PENDING', 'APPROVED', 'IN_PROGRESS', 'FINISHED', 'INVOICED', 'IN_DELIVERY'],
    message: '{VALUE} is not a valid order status'
};

let orderSchema = new Schema({
    orderDate: {
        type: String,
        required: [true, 'The order date is required']
    },
    endDate: {
        type: String,
        required: [true, 'The end date is required']
    },
    number: {
        type: Number,
        required: [true, 'The number order is required'],
    },
    status: {
        type: String,
        default: 'PENDING',
        enum: status
    },
    shippingType: {
        type: Number,
        required: [true, 'The shipping type is required']
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    details: [{
        type: Schema.Types.ObjectId,
        ref: 'OrderDetail',
        required: false
    }]
});

module.exports = mongoose.model('Order', orderSchema);