const mongoose = require("mongoose");

const ContactUsSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, "Full names are required"]
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Email is required"]
    },
    image: {
        type: String,
        required: [true, "Image is required"]
    },
    diocese: {
        type: String,
        required: [true, "Diocese is required"]
    },
    fbLink: {
        type: String
    },
    twLink: {
        type: String
    }
},
    { timestamps: true });

module.exports = mongoose.model("ContactUs", ContactUsSchema)