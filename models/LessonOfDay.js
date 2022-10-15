const mongoose = require("mongoose");

const LessonOfDaySchema = new mongoose.Schema({
    title: {
        type: String,
        unique: true,
        required: [true, "Title is required"]
    },
    description: {
        type: String,
        required: [true, "Description is required"]
    },
    image: {
        type: String
    }
},
    { timestamps: true });

module.exports = mongoose.model("Lesson", LessonOfDaySchema)