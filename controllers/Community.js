const express = require('express')
const CommunityMember = require("../models/Community");
const { success, fail, sendError } = require('../function/respond')

const createCommunity = async (req, res) => {
    const { name, member, image, diocese, fbLink, twLink } = req.body;
    const newContactUs = new CommunityMember({
        member,
        name,
        diocese,
        fbLink,
        twLink,
        image
    });
    try {
        const findCommunity = await CommunityMember.findOne({ name: name });
        if (findCommunity) return sendError(res, 409, "This Community already exist!", null);

        const communitySaved = await newContactUs.save();
        return success(res, 201, communitySaved, "Community added successful")
    } catch (error) {
        return sendError(res,500,null,error.message)
    }
}

const getCommunities = async (req, res) => {
    try {
        const community = await CommunityMember.find().sort("-createdAt");
        return success(res, 200, community, "retrieved Communities")
    } catch (error) {
        return sendError(res,500,null,error.message)
    }
}

const getCommunity = async (req, res) => {
    const id = req.params.id;
    try {
        const community = await CommunityMember.findById(id)
        if (!community) return fail(res, 400, null, "Wrong Id");
        return success(res, 200, community, "retrieved Communities")
    } catch (error) {
        return sendError(res,500,null,error.message)
    }
}

const deleteCommunity = async (req, res) => {
    const id = req.params.id;
    try {
        const community = await CommunityMember.findByIdAndDelete(id)
        if (!community) return fail(res, 400, null, "Community doesn't exist")
        return success(res, 200, null, "Community deleted successful")
    } catch (error) {
        return sendError(res,500,null,error.message)
    }
}

const updateCommunity = async (req, res) => {
    try {
        var id = req.params.id;
        const updatedCommunity = await CommunityMember.findByIdAndUpdate({ _id: id }, req.body, {
            new: true,
        })
        if (updatedCommunity) {
            return success(res, 201, "Community updated successful", updatedCommunity)
        }
        else {
            return fail(res, 404, `We don't have Community with this id ${id}`, null)
        }
    } catch (error) {
        res.status(200).json({ status: 'fail', message: error });
    }
}


module.exports = { createCommunity, getCommunities, getCommunity, deleteCommunity, updateCommunity }