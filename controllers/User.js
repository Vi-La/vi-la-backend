const express = require('express')
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const sendEmail = require("../utils/email");
const jwt = require("jsonwebtoken");
const { success, fail, sendError } = require('../function/respond')

// ===========START: CREATE USER===============
const createUser = async (req, res) => {
    try {
        const password = req.body.password
        const newUser = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            telephone: req.body.telephone,
            password: CryptoJS.AES.encrypt(password, process.env.PASS_SEC).toString()
        });
    const URL = `https://www.rcc_rwanda.com/`;
    const message = `
    Dear ${newUser.firstName},
    Congratulations, you are most welcome to RCC Rwanda. 
    please login to our Web site:${URL}, 
    your username and password are as follow: 
    username:${newUser.email}, 
    Password:${password}.
    `;
    await sendEmail({
      email: newUser.email,
      subject: "Congratulations, welcome to RCC.",
      message,
    });
    const userSaved = await newUser.save();
    return success(res, 201, newUser, "Email Sent successfully 👍🏾")
    } catch (error) {
        return sendError(res,500,null,error.message)
    }
}
// ===========END: CREATE USER===============

// ===========START: GET USERS===============
const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        return success(res, 200, users, "retrieved all users")
    } catch (error) {
        return sendError(res,500,null,error.message)
    }
}
// ===========END: GET USERS===============

// ===========START: GET USER===============
const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId)

        return success(res, 200, user, "retrieved user")

    } catch (error) {
        return sendError(res,500,null,error.message)
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
        return sendError(res,500,null,error.message)
    }
}
// ===========END: DELETE USER===============

// ===========START: UPDATE USER===============
const updatedUser = async (req, res) => {
    try {
        var userId = req.params.userId;
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
        return sendError(res,500,null,error.message)
    }
}

// ===========END: UPDATE USER===============

// =======Start:: Login ========
const userLogin = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        !user && res.status(401).json("wrong credentials!")

        const hashedPassword = CryptoJS.AES.decrypt(
            user.password,
            process.env.PASS_SEC
        );
        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
        originalPassword !== req.body.password && res.status(401).json({
            status: 'fail',
            message: 'wrong credentials!'
        });

        const accessToken = jwt.sign(
            {
                id: user._id,
                isAdmin: user.isAdmin,
                email: user.email
            },
            process.env.JWT_SEC, { expiresIn: "1h" }
        );

        const { password, ...others } = user._doc;

        res.status(200).json({ status: 'success', ...others, accessToken, message: 'loged in successful' });
    } catch (error) {
        return sendError(res,500,null,error.message)
    }
}
// =======End:: Login ========


module.exports = { createUser, getUsers, getUser, deletedUser, updatedUser, userLogin };