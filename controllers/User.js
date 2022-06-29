const express = require('express')
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const bcrypt = require("bcrypt");
const generator = require('generate-password')
const { sendEmail, hashPassword, comparePassword } = require("../utils/email");
const jwt = require("jsonwebtoken");
const { success, fail, sendError, generateToken } = require('../function/respond')

// ===========START: CREATE USER===============
const createUser = async (req, res) => {
    try {
        const passwordNew = generator.generate({
            length: 11,
            numbers: true
        });
        const hashedPassword = hashPassword(passwordNew)

        const newUser = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            telephone: req.body.telephone,
            password: hashedPassword
        });
        // EMAIL_PASSWORD= udtjhtwylpjdlrma
        const URL = `https://www.rcc_rwanda.com/`;
        const message = `
    Dear ${newUser.firstName},
    Congratulations, you are most welcome to RCC Rwanda. 
    please login to our Web site: ${URL}, 
    your username and password are as follow: 
    Username: ${newUser.email}, 
    Password: ${passwordNew}.
    `;
        await sendEmail({
            email: newUser.email,
            subject: "Congratulations, welcome to RCC.",
            message,
        });
        const userSaved = await newUser.save();
        return success(res, 201, newUser, "Email Sent successfully 👍🏾")
    } catch (error) {
        // return sendError(res,500,null,error.message)
        console.log(error.message)
    }
}
// ===========END: CREATE USER===============

// ===========START: GET USERS===============
const getUsers = async (req, res) => {
    try {
        const users = await User.find().sort({ createdAt: -1 });
        return success(res, 200, users, "retrieved all users")
    } catch (error) {
        return sendError(res, 500, null, error.message)
    }
}
// ===========END: GET USERS===============

// ===========START: GET USER===============
const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId)

        return success(res, 200, user, "retrieved user")

    } catch (error) {
        return sendError(res, 500, null, error.message)
    }
}
// ===========END: GET USER===============

// ===========START: DELETE USER===============
const deletedUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.userId)
        if (!user) return fail(res, 400, null, "user doesn't exist")
        return success(res, 200, null, "user deleted successful")
    } catch (error) {
        return sendError(res, 500, null, error.message)
    }
}
// ===========END: DELETE USER===============

// ===========START: UPDATE USER===============
const updatedUser = async (req, res) => {
    try {
        var userId = req.params.userId;
        if (req.body.password) {
            req.body.password = await bcrypt.hashSync(req.body.password, 10)
        }
        let bodyData = req.body;
        let data = await User.findOneAndUpdate(
            { _id: userId },
            { $set: bodyData });
        const findeUpdateUser = await User.findOne({ _id: userId });
        if (findeUpdateUser) {
            message = `User updated successful`;
            success(res, 200, findeUpdateUser, message);
            return;
        }
        else {
            message = `We don't have User with this id ${userId}`;
            fail(res, 404, null, message);
            return;
        }
    }
    catch (error) {
        return sendError(res, 500, null, error.message)
    }
}

// ===========END: UPDATE USER===============

// =======Start:: Login ========
const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await User.findOne({ email }).select("+password")

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({
                status: "fail",
                message: "Invalid email or password"
            })
        }

        const accessToken = generateToken(user._id)

        const data = {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            telephone: user.telephone,
        }
        res.status(200).json({ status: 'success', data, accessToken, message: 'loged in successful' });

    } catch (error) {
        // console.error(error)
        return sendError(res, 500, null, error.message)
    }

}
// =======End:: Login ========


module.exports = { createUser, getUsers, getUser, deletedUser, updatedUser, userLogin };