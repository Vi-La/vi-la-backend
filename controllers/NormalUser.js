const express = require('express')
const NormalUser = require("../models/NormalUser");
const { hashPassword } = require("../utils/email");
const { success, fail, sendError } = require('../function/respond')

// ===========Start:: create a new CommunityMember===============
const createNormalUser = async (req, res) => {
    const password = req.body.password
    const hashedPassword = hashPassword(password)
    const { fname, lname, email, phone, country, diocese } = req.body;
    const newNormalUser = new NormalUser({
        fname,
        lname,
        email,
        phone,
        country,
        diocese,
        password:hashedPassword
    });
    try {
        const normalSaved = await newNormalUser.save();
        return success(res, 201, normalSaved, "User created successful")
    } catch (error) {
        return sendError(res,500,null,error.message)
    }
}
// ===========End: create a new CommunityMembers===============

// ===========Start: Get CommunityMember===============
const getNormalUsers = async (req, res) => {
    try {
        const normalUser = await NormalUser.find().sort({ createdAt: -1 });
        return success(res, 200, normalUser, "retrieved Users")
    } catch (error) {
        return sendError(res,500,null,error.message)
    }
}
// ===========End:: Get CommunityMembers===============

// ===========Start:: Get CommunityMember===============
const getNormalUser = async (req, res) => {
    const mtyId = req.params.postId;
    try {
        const normalUser = await NormalUser.findById(mtyId)
        if (!mtyId) return fail(res, 400, null, "Wrong Id");
        return success(res, 200, normalUser, "retrieved Users")
    } catch (error) {
        return sendError(res,500,null,error.message)
    }
}
// ===========End:: Get CommunityMember===============

// ===========Start:: Delete CommunityMember===============
const deleteNormalUser = async (req, res) => {
    const mtyId = req.paramUsers
    try {
        const normalUser = await NormalUser.findByIdAndDelete(mtyId)
        if (!normalUser) return fail(res, 400, null, "User doesn't exist")
        return success(res, 200, null, "User deleted successful")
    } catch (error) {
        return sendError(res,500,null,error.message)
    }
}
// ===========End:: Delete CommunityMember===============

// ===========Start:: Update CommunityMember===============
const updateNormalUser = async (req, res) => {
    try {
        var postId = req.params.postId;
        let bodyData = req.body;
        let data = await NormalUser.findOneAndUpdate(
            { _id: postId },
            { $set: bodyData });
        const findeUpdaUsers = await NormalUser.findOne({ _id: postId });
        if (findeUpdaUsers) {
            message = `Users updated successful`;
            success(res, 200, findeUpdaUsers, message);
            return;
        }
        else {
            message = `We don't have Users with this id: ${postId}`;
            fail(res, 404, null, message);
            return;
        }
    }
    catch (error) {
        return sendError(res,500,null,error.message)
    }
}
// ===========End:: Update CommunityMember===============

module.exports = { createNormalUser, getNormalUsers, getNormalUser, deleteNormalUser, updateNormalUser }