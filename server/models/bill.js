const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let payments = {
    values: ['DEBIT', 'CREDIT', 'CASH'],
    message: '{VALUE} is not a valid payment type'
};

let billSchema = new Schema({
    date: {
        type: String,
        required: [true, 'The date is required']
    },
    number: {
        type: String,
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
        type: Boolean,
        default: true
    },
    order: {
        type: Schema.Types.ObjectId,
        ref: 'Order',
        required: true
    }
});

module.exports = mongoose.model('Bill', billSchema);