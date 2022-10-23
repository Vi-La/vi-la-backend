const mongoose = require("mongoose");
const validator = require('validator');
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First Name is required"]
    },
    telephone: {
        type: Number,
        required: [true, "Telephone is required"]
    },
    diocese: {
        type: String,
        required: [true, "Diocese is required"]
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Email is required"],
        validate(value) {
            if (!validator.isEmail(value))
                throw new Error('Invalid Email')
        }
    },
    lastName: String,
    country: String,
    password: String,
    confirmPassword: String,
    profileImage: String,
    userType: {
        type: String,
        enum: ["User", "Belige", "Admin"],
        default: "User",
    },
},
    { timestamps: true });

module.exports = mongoose.model("User", UserSchema)