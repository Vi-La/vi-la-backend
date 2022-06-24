const express = require('express')
const CommunityMember = require("../models/Community");
const { success, fail, sendError } = require('../function/respond')

// ===========Start:: create a new CommunityMember===============
const createCommunity = async (req, res) => {
    const avata = 'https://cdn.pixabay.com/photo/2017/02/20/10/57/worship-2082141__480.jpg';
    const { member, title, action, twLink, image } = req.body;
    const newContactUs = new CommunityMember({
        member,
        title,
        action,
        twLink,
        image
    });
    try {
        const communitySaved = await newContactUs.save();
        return success(res, 201, communitySaved, "Community added successful")
    } catch (error) {
        return sendError(res,500,null,error.message)
    }
}
// ===========End: create a new CommunityMembers===============

// ===========Start: Get CommunityMember===============
const getCommunities = async (req, res) => {
    try {
        const community = await CommunityMember.find();
        return success(res, 200, community, "retrieved Communities")
    } catch (error) {
        return sendError(res,500,null,error.message)
    }
}
// ===========End:: Get CommunityMembers===============

// ===========Start:: Get CommunityMember===============
const getCommunity = async (req, res) => {
    const mtyId = req.params.postId;
    try {
        const community = await CommunityMember.findById(mtyId)
        if (!mtyId) return fail(res, 400, null, "Wrong Id");
        return success(res, 200, community, "retrieved Communities")
    } catch (error) {
        return sendError(res,500,null,error.message)
    }
}
// ===========End:: Get CommunityMember===============

// ===========Start:: Delete CommunityMember===============
const deleteCommunity = async (req, res) => {
    const mtyId = req.params.postId;
    try {
        const community = await CommunityMember.findByIdAndDelete(mtyId)
        if (!community) return fail(res, 400, null, "Community doesn't exist")
        return success(res, 200, null, "Community deleted successful")
    } catch (error) {
        return sendError(res,500,null,error.message)
    }
}
// ===========End:: Delete CommunityMember===============

// ===========Start:: Update CommunityMember===============
const updateCommunity = async (req, res) => {
    try {
        var postId = req.params.postId;
        let bodyData = req.body;
        let data = await CommunityMember.findOneAndUpdate(
            { _id: postId },
            { $set: bodyData });
        const findeUpdaCommunity = await CommunityMember.findOne({ _id: postId });
        if (findeUpdaCommunity) {
            message = `Community updated successful`;
            success(res, 200, findeUpdaCommunity, message);
            return;
        }
        else {
            message = `We don't have community with this id: ${postId}`;
            fail(res, 404, null, message);
            return;
        }
    }
    catch (error) {
        return sendError(res,500,null,error.message)
    }
}
// ===========End:: Update CommunityMember===============

module.exports = { createCommunity, getCommunities, getCommunity, deleteCommunity, updateCommunity }