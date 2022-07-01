const mongoose = require("mongoose");
const validator = require('validator')

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        validate(value){
            if(!validator.isEmail(value))
            throw new Error('Invalid Email')
        }
    },
    telephone: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 4,
        select:false
    },
    confirmPass: {
        type: String
    },
    isAdmin: {
        type: Boolean,
        defualt: true
    },
    userType: {
        type: String,
        default: true
    }
},
    { timestamps: true });

module.exports = mongoose.model("User", UserSchema)