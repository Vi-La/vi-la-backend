const mongoose = require("mongoose");
const validator = require('validator')

const GallerySchema = new mongoose.Schema({
    name: String,
    date: Date,
    image: {
        type: String,
        required: [true, "Image is required"]
    },
},
    { timestamps: true });

module.exports = mongoose.model("Gallery", GallerySchema)