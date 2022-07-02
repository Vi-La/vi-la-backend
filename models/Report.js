const mongoose = require("mongoose");

const ReportSchema = new mongoose.Schema({
    senderName: {
        type: String,
        required: true
    },
    diocese: {
        type: String,
        required: true
    },
    reportMessage: {
        type: String,
        required: true
    }
},
    { timestamps: true });

module.exports = mongoose.model("Report", ReportSchema)