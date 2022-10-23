const mongoose = require("mongoose");

const CommunityMemberSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: [true, "Community name is required"]
    },
    diocese: {
        type: String,
        required: [true, "Diocese is required"]
    },
    member: String,
    image: String,
    fbLink: String,
    twLink: String
},
    { timestamps: true });

module.exports = mongoose.model("CommunityMember", CommunityMemberSchema)