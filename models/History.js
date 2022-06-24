const mongoose = require("mongoose");

const HistorySchema = new mongoose.Schema({
    eventName: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    }
},
    { timestamps: true });

module.exports = mongoose.model("History", HistorySchema)