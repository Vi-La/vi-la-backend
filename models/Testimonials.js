const mongoose = require("mongoose");

const TestimonialSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    title: {
        type: String
    },
    message: {
        type: String,
        required: true
    },
    image: {
        type: String
    }
},
    { timestamps: true });

module.exports = mongoose.model("Testimonials", TestimonialSchema)