const mongoose = require("mongoose");
const validator = require('validator')

const MessageSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, "Names are required"]
    },
    phone: {
        type: Number,
        required: [true, "Telephone Number is required"]
    },
    country: {
        type: String,
        required: [true, "Country is required"]
    },
    diosece: {
        type: String,
        required: [true, "Diocese is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        validate(value){
            if(!validator.isEmail(value))
            throw new Error('Invalid Email')
        }
    },
    message: {
        type: String,
        required: [true, "Message is required"]
    }
},
    { timestamps: true });

module.exports = mongoose.model("Message", MessageSchema)