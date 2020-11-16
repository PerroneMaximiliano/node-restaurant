const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let roles = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} is not a valid role'
};

let Schema = mongoose.Schema;
let userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'The name is required']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'The email is required'],
    },
    password: {
        type: String,
        required: [true, 'The password is required']
    },
    img: {
        type: String,
        required: [false]
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: roles
    },
    status: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

userSchema.plugin(uniqueValidator, {
    message: '{PATH} could be unique'
});

userSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;
    return userObject;
};

module.exports = mongoose.model('User', userSchema);