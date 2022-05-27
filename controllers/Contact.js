const express = require('express')
const nodemailer = require('nodemailer')

const Contact = require("../models/Contact");
const { success, fail, sendError } = require('../function/respond')


// ===========Start:: create a new Message===============
const createMessage = async (req, res) => {
    const { fullName, phone, address, email, message } = req.body;
    const newMessage = new Contact({
        fullName,
        phone,
        address,
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
// ===========End: create a new Message===============

// ===========Start: Get Messages===============
const getMessages = async (req, res) => {
    try {
        const messages = await Contact.find();
        return success(res, 200, messages, "retrieved all Messages")
    } catch (error) {
        return sendError(res,500,null,error.message)
    }
}
// ===========End:: Get Messages===============

// ===========Start:: Get Message===============
const getMessage = async (req, res) => {
    const msgId = req.params.postId;
    try {
        const message = await Contact.findById(msgId)
        if (!msgId) return fail(res, 400, null, "Wrong Id");
        return success(res, 200, message, "retrieved post")
    } catch (error) {
        return sendError(res,500,null,error.message)
    }
}
// ===========End:: Get Message===============

// ===========Start:: Delete Message===============
const deletedMessage = async (req, res) => {
    const msgId = req.params.postId;
    try {
        const message = await Contact.findByIdAndDelete(msgId)
        if (!message) return fail(res, 400, null, "Message doesn't exist")
        return success(res, 200, null, "Message deleted successful")
    } catch (error) {
        return sendError(res,500,null,error.message)
    }
}
// ===========End:: Delete Message===============

module.exports = { createMessage, getMessages, getMessage, deletedMessage };