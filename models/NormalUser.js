const mongoose = require("mongoose");
const validator = require('validator')

const NormalUserSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
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
    phone: {
        type: Number,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    diocese: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 4,
        select:false
    }
},
    { timestamps: true });

module.exports = mongoose.model("NormalUser", NormalUserSchema)