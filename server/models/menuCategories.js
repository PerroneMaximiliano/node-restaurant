const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let menuCategoriesSchema = new Schema({
    description: {
        type: String,
        unique: true,
        required: [true, 'The description is required']
    },
    img: {
        type: String,
        required: [false]
    },
    status: {
        type: Boolean,
        default: true
    },
});

menuCategoriesSchema.plugin(uniqueValidator, {
    message: '{PATH} could be unique'
});

module.exports = mongoose.model('MenuCategories', menuCategoriesSchema);