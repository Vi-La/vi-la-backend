const mongoose = require("mongoose");
const validator = require('validator')

const NewsSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: true,
        required: true
    },
    subTitle: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true,
    },
    newsImage: {
        type: String
    }
},
    { timestamps: true });

module.exports = mongoose.model("News", NewsSchema)