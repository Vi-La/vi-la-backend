const mongoose = require("mongoose");

const CommunityMemberSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    member: {
        type: String,
        required: true
    },
    action: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    twLink: {
        type: String
    }
},
    { timestamps: true });

module.exports = mongoose.model("CommunityMember", CommunityMemberSchema)