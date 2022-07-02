const express = require('express')
const History = require("../models/History");
const { success, fail, sendError } = require('../function/respond')

// ===========Start:: create a new CommunityMember===============
const createHistory = async (req, res) => {
    const avata = 'https://cdn.pixabay.com/photo/2017/02/20/10/57/worship-2082141__480.jpg';
    const { eventName, title, content, year, image } = req.body;
    const newHistory = new History({
        eventName,
        title,
        content,
        year,
        image
    });
    try {
        const historySaved = await newHistory.save();
        return success(res, 201, historySaved, "History created")
    } catch (error) {
        return sendError(res,500,null,error.message)
    }
}
// ===========End: create a new CommunityMembers===============

// ===========Start: Get CommunityMember===============
const getHistories = async (req, res) => {
    try {
        const history = await History.find().sort({ createdAt: -1 });
        return success(res, 200, history, "retrieved Histories")
    } catch (error) {
        return sendError(res,500,null,error.message)
    }
}
// ===========End:: Get CommunityMembers===============

// ===========Start:: Get CommunityMember===============
const getHistory = async (req, res) => {
    const hstryId = req.params.postId;
    try {
        const history = await History.findById(hstryId)
        if (!hstryId) return fail(res, 400, null, "Wrong Id");
        return success(res, 200, history, "retrieved History")
    } catch (error) {
        return sendError(res,500,null,error.message)
    }
}
// ===========End:: Get CommunityMember===============

// ===========Start:: Delete CommunityMember===============
const deleteHistory = async (req, res) => {
    const mtyId = req.params.postId;
    try {
        const history = await History.findByIdAndDelete(mtyId)
        if (!history) return fail(res, 400, null, "History doesn't exist")
        return success(res, 200, null, "History deleted successful")
    } catch (error) {
        return sendError(res,500,null,error.message)
    }
}
// ===========End:: Delete CommunityMember===============

// ===========Start:: Update CommunityMember===============
const updateHistory = async (req, res) => {
    try {
        var postId = req.params.postId;
        let bodyData = req.body;
        let data = await History.findOneAndUpdate(
            { _id: postId },
            { $set: bodyData });
        const findeUpdaHistory = await History.findOne({ _id: postId });
        if (findeUpdaHistory) {
            message = `History updated successful`;
            success(res, 200, findeUpdaHistory, message);
            return;
        }
        else {
            message = `We don't have History with this id: ${postId}`;
            fail(res, 404, null, message);
            return;
        }
    }
    catch (error) {
        return sendError(res,500,null,error.message)
    }
}
// ===========End:: Update CommunityMember===============

module.exports = { createHistory, getHistories, getHistory, deleteHistory, updateHistory }