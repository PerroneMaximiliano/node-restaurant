const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let productCategoriesSchema = new Schema({
    description: {
        type: String,
        required: [true, 'The description is required']
    },
    parent: {
        type: Schema.Types.ObjectId,
        ref: "ProductCategories",
        required: false
    },
    img: {
        type: String,
        required: [false]
    },
    status: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('ProductCategories', productCategoriesSchema);