const express = require('express')
const nodemailer = require('nodemailer')

const Message = require("../models/Message");
const { success, fail, sendError } = require('../function/respond')

const sendMessage = async (req, res) => {
    const { fullName, phone, country, email, diosece, message } = req.body;
    const newMessage = new Message({
        fullName,
        phone,
        country,
        diosece,
        email,
        message
    });
    try {
        const messageSaved = await newMessage.save();
        return success(res, 201, messageSaved, "Message have been sent")
    } catch (error) {
        return sendError(res,500,null,error.message)
    }
}

const getMessages = async (req, res) => {
    try {
        const messages = await Message.find().sort("-createdAt");
        return success(res, 200, messages, "retrieved all Messages")
    } catch (error) {
        return sendError(res,500,null,error.message)
    }
}

const getMessage = async (req, res) => {
    const id = req.params.id;
    try {
        const message = await Message.findById(id)
        if (!message) return fail(res, 400, null, "Wrong Id");
        return success(res, 200, message, "retrieved post")
    } catch (error) {
        return sendError(res,500,null,error.message)
    }
}

const deletedMessage = async (req, res) => {
    const id = req.params.id;
    try {
        const message = await Message.findByIdAndDelete(id)
        if (!message) return fail(res, 400, null, "Message doesn't exist")
        return success(res, 200, null, "Message deleted successful")
    } catch (error) {
        return sendError(res,500,null,error.message)
    }
}


module.exports = { sendMessage, getMessages, getMessage, deletedMessage };