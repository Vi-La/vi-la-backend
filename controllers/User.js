const express = require('express')
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const generator =require('generate-password')
const {  hashPassword, sendEmail } = require("../utils/email");
const { success, fail, sendError } = require('../function/respond')

const createUser = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            telephone,
            country,
            diocese,
            email,
            profileImage,
            userType
        } = req.body

        const passwordNew = generator.generate({
            length: 11,
            numbers: true
        });

        const hashedPassword = passwordNew
        const password = hashedPassword

        const newUser = new User({
            firstName: firstName,
            lastName: lastName,
            country: country,
            diocese: diocese,
            telephone: telephone,
            email: email,
            profileImage:profileImage,
            password: hashPassword(password),
            userType: userType
        });

        const findUser = await User.findOne({ email: email });
        if (findUser) return sendError(res, 409, "This email already exist! change email address 👍🏼", null);

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
        return success(res, 201, userSaved, "Account created and Password sent to your email")
    } catch (error) {
        return sendError(res, 500, null, error.message)
    }
}

const getUsers = async (req, res) => {
    try {
        const users = await User.find().sort("-createdAt");
        return success(res, 200, users, "retrieved all users")
    } catch (error) {
        return sendError(res, 500, null, error.message)
    }
}

const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user) return fail(res, 400, "user doesn't exist", null)
        return success(res, 200, "retrieved Users", user)

    } catch (error) {
        return sendError(res, 500, error.message, null)
    }
}

const deletedUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        if (!user) return fail(res, 400, null, "user doesn't exist")
        return success(res, 200, null, "user deleted successful")
    } catch (error) {
        return sendError(res, 500, null, error.message)
    }
}

const updatedUser = async (req, res) => {
    try {
        var id = req.params.id;
        const updatedUser = await User.findByIdAndUpdate({ _id: id }, req.body, {
            new: true,
        })
        if (updatedUser) {
            return success(res, 201, "User updated successful", updatedUser)
        }
        else {
            return fail(res, 404, `We don't have User with this id ${id}`, null)
        }
    } catch (error) {
        res.status(200).json({ status: 'fail', message: error });
    }
}

const changeUserPass = async (req, res) => {
    try {
        var id = req.params.id;
        let {password,confirmPassword} = req.body;
        if(password !=confirmPassword) return fail(res,400,"Password doens't match")
        let data = await User.findOneAndUpdate({ _id: id },
             {password: hashPassword(password)} );
        const findeUpdateUser = await User.findOne({ _id: id });
        if (findeUpdateUser) {
            return success(res,200,"Password Changed successful",findeUpdateUser);
        }
        else {
            return fail(res,400,"User doens't exist",null );
        }
    } catch (error) {
        res.status(200).json({ status: 'fail', message: error });
    }
}

const userLogin = (req, res, next) => {
    User.find({ email: req.body.email })
        .select()
        .exec()
        .then(user => {
            if (user.length < 1) {
                return fail(res, 404, "invalid credential", null)
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (result) {
                    const token = jwt.sign(
                        {
                            userType: user[0].userType,
                            email: user[0].email,
                            userId: user[0]._id
                        },
                        process.env.JWT_SEC,
                        {
                            expiresIn: "1h"
                        }
                    );
                    return res.status(200).json({ status: 'success', user, token, message: 'Welcome 👍🏾' });
                }
                return fail(res, 404, null, "invalid credential")
            });
        })
        .catch(err => {
            console.log(err);
            return sendError(res, 500, null, err.message)
        });
};

module.exports = { createUser, getUsers, getUser, deletedUser, updatedUser, changeUserPass, userLogin };