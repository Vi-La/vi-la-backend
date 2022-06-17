const mongoose = require("mongoose");

const ContactUsSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    diocese: {
        type: String,
        unique: true
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