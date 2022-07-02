const mongoose = require("mongoose");

const SainterSchema = new mongoose.Schema({
    sainterName: {
        type: String,
        unique: true,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    image: {
        type: String
    }
},
    { timestamps: true });

module.exports = mongoose.model("Sainter", SainterSchema)