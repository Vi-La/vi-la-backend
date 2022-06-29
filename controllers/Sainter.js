const express = require('express')
const Sainter = require("../models/Sainter");
const { success, fail, sendError } = require('../function/respond')

// ===========Start:: create a new Sainters===============
const createSainter = async (req, res) => {
    const avata = 'https://cdn.pixabay.com/photo/2015/03/13/08/45/crosses-671379__340.jpg';
    const { sainterName, desc, image } = req.body;
    const saintOfDay = new Sainter({
        sainterName,
        desc,
        image
    });
    try {
        const saintSaved = await saintOfDay.save();
        return success(res, 201, saintSaved, "Sainter of the day added successful")
    } catch (error) {
        return sendError(res,500,null,error.message)
    }
}
// ===========End: create a new Sainters===============

// ===========Start: Get Sainters===============
const getSainters = async (req, res) => {
    try {
        const AllSaint = await Sainter.find().sort({ createdAt: -1 });
        return success(res, 200, AllSaint, "retrieved all Saints")
    } catch (error) {
        return sendError(res,500,null,error.message)
    }
}
// ===========End:: Get Sainters===============

// ===========Start:: Get Sainter===============
const getSainter = async (req, res) => {
    const postId = req.params.postId;
    try {
        const saint = await Sainter.findById(postId)
        if (!postId) return fail(res, 400, null, "Wrong Id");
        return success(res, 200, saint, "retrieved Saint")
    } catch (error) {
        return sendError(res,500,null,error.message)
    }
}
// ===========End:: Get Sainter===============

// ===========Start:: Delete Sainter===============
const deleteSainter = async (req, res) => {
    const postId = req.params.postId;
    try {
        const saint = await Sainter.findByIdAndDelete(postId)
        if (!saint) return fail(res, 400, null, "saint doesn't exist")
        return success(res, 200, null, "saint has been removed")
    } catch (error) {
        return sendError(res,500,null,error.message)
    }
}
// ===========End:: Delete Sainter===============

// ===========Start:: Update Sainter===============
const updatedSainter = async (req, res) => {
    try {
        var postId = req.params.postId;
        let bodyData = req.body;
        let data = await Sainter.findOneAndUpdate(
            { _id: postId },
            { $set: bodyData });
        const findeUpdaSaint = await Sainter.findOne({ _id: postId });
        if (findeUpdaSaint) {
            message = `findeUpdaSaint updated successful`;
            success(res, 200, findeUpdaSaint, message);
            return;
        }
        else {
            message = `We don't have findeUpdaSaint with this id ${postId}`;
            fail(res, 404, null, message);
            return;
        }
    }
    catch (error) {
        return sendError(res,500,null,error.message)
    }
}
// ===========End:: Update Sainter===============

module.exports = { createSainter, getSainters, getSainter, deleteSainter, updatedSainter };