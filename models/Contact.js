const mongoose = require("mongoose");
const validator = require('validator')

const ContactSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true,
        min:10
    },
    address: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        validate(value){
            if(!validator.isEmail(value))
            throw new Error('Invalid Email')
        }
    },
    message: {
        type: String,
        required: true
    }
},
    { timestamps: true });

module.exports = mongoose.model("Contact", ContactSchema)