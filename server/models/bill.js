const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let payments = {
    values: ['DEBIT', 'CREDIT', 'CASH'],
    message: '{VALUE} is not a valid payment type'
};

let billSchema = new Schema({
    orderDate: {
        type: String,
        required: [true, 'The order date is required']
    },
    number: {
        type: Number,
        required: [true, 'The number order is required'],
    },
    discount: {
        type: Number,
        required: [true, 'The discount amount is required']
    },
    total: {
        type: Number,
        required: [true, 'The total is required']
    },
    paymentType: {
        type: String,
        default: 'CASH',
        enum: payments
    },
    nroCard: {
        type: String,
        required: [true, 'The number card is required']
    },
    status: {
        type: String,
        default: 'PENDING'
            //enum: status
    }
});

module.exports = mongoose.model('Bill', billSchema);