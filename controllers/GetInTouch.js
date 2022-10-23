const express = require('express')
const ContactUs = require("../models/GetInTouch");
const { success, fail, sendError } = require('../function/respond')

const createLeader = async (req, res) => {
    try {
        const {
            fullName,
            email,
            image,
            diocese,
            fbLink,
            twLink
        } = req.body

        const newLeader = new ContactUs({
            fullName: fullName,
            email: email,
            image: image,
            diocese: diocese,
            fbLink: fbLink,
            twLink: twLink
        });

        const findLeader = await ContactUs.findOne({ email: email });
        if (findLeader) return sendError(res, 409, "This email already exist! change email address 👍🏼", null);

        const leaderSaved = await newLeader.save();
        return success(res, 201, leaderSaved, "Leader added successful")
    } catch (error) {
        return sendError(res, 500, null, error.message)
    }
}

const getLeaders = async (req, res) => {
    try {
        const leaders = await ContactUs.find().sort("-createdAt");
        return success(res, 200, leaders, "retrieved all Leaders")
    } catch (error) {
        return sendError(res, 500, null, error.message)
    }
}

const getLeader = async (req, res) => {
    try {
        const leader = await ContactUs.findById(req.params.id)
        if (!leader) return fail(res, 400, "Leader doesn't exist", null)
        return success(res, 200, "retrievedLeaders", leader)

    } catch (error) {
        return sendError(res, 500, error.message, null)
    }
}

const deleteLeader = async (req, res) => {
    try {
        const leader = await ContactUs.findByIdAndDelete(req.params.id)
        if (!leader) return fail(res, 400, null, "Leader doesn't exist")
        return success(res, 200, null, "Leader deleted successful")
    } catch (error) {
        return sendError(res, 500, null, error.message)
    }
}

const updateLeader = async (req, res) => {
    try {
        var id = req.params.id;
        const updatedLeader = await ContactUs.findByIdAndUpdate({ _id: id }, req.body, {
            new: true,
        })
        if (updatedLeader) {
            return success(res, 201, "Leader updated successful", updatedLeader)
        }
        else {
            return fail(res, 404, `We don't have Leader with this id ${id}`, null)
        }
    } catch (error) {
        res.status(200).json({ status: 'fail', message: error });
    }
}

module.exports = { createLeader, getLeaders, getLeader, deleteLeader, updateLeader }