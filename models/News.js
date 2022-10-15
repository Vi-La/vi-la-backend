const mongoose = require("mongoose");
const validator = require('validator')

const NewsSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: true,
        required: [true, "Title is required"]
    },
    description: {
        type: String,
        required: [true, "Description is required"]
    },
    image: String
},
    { timestamps: true });

module.exports = mongoose.model("News", NewsSchema)