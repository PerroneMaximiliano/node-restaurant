const mongoose = require('mongoose');

let Schema = mongoose.Schema;
let articleDetailSchema = new Schema({
    quantity: {
        type: Number,
        required: [true, 'The quantity is required'],
    },
    article: {
        type: Schema.Types.ObjectId,
        ref: 'Article',
        required: true
    },
    supplies: {
        type: Schema.Types.ObjectId,
        ref: 'Supplies',
        required: true
    }
});

module.exports = mongoose.model('ArticleDetail', articleDetailSchema);