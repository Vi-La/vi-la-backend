const express = require('express')
const ContactUs = require("../models/GetInTouch");
const { success, fail, sendError } = require('../function/respond')

// ===========Start:: create a new GetInTouch===============
const createContactUs = async (req, res) => {
    const avata = 'https://cdn.pixabay.com/photo/2016/03/21/00/54/prayer-1269776__480.png';
    const { fullName, title, diocese, fbLink, twLink } = req.body;
    const newContactUs = new ContactUs({
        fullName,
        title,
        diocese,
        fbLink,
        twLink,
        image: avata
    });
    try {
        const personalSaved = await newContactUs.save();
        return success(res, 201, personalSaved, "Community member added successful")
    } catch (error) {
        return sendError(res,500,null,error.message)
    }
}
// ===========End: create a new GetInTouch===============

// ===========Start: Get GetInTouches===============
const getMembers = async (req, res) => {
    try {
        const members = await ContactUs.find();
        return success(res, 200, members, "retrieved all Community members")
    } catch (error) {
        return sendError(res,500,null,error.message)
    }
}
// ===========End:: Get GetInTouches===============

// ===========Start:: Get GetInTouche===============
const getMember = async (req, res) => {
    const mbrId = req.params.postId;
    try {
        const member = await ContactUs.findById(mbrId)
        if (!mbrId) return fail(res, 400, null, "Wrong Id");
        return success(res, 200, member, "retrieved Member")
    } catch (error) {
        return sendError(res,500,null,error.message)
    }
}
// ===========End:: Get GetInTouche===============

// ===========Start:: Delete GetInTouche===============
const deleteMember = async (req, res) => {
    const mbrId = req.params.postId;
    try {
        const member = await ContactUs.findByIdAndDelete(mbrId)
        if (!member) return fail(res, 400, null, "Member doesn't exist")
        return success(res, 200, null, "Member deleted successful")
    } catch (error) {
        return sendError(res,500,null,error.message)
    }
}
// ===========End:: Delete GetInTouche===============

// ===========Start:: Update testimonial===============
const updateMember = async (req, res) => {
    try {
        var postId = req.params.postId;
        let bodyData = req.body;
        let data = await ContactUs.findOneAndUpdate(
            { _id: postId },
            { $set: bodyData });
        const findeUpdaMember = await ContactUs.findOne({ _id: postId });
        if (findeUpdaMember) {
            message = `Community member updated successful`;
            success(res, 200, findeUpdaMember, message);
            return;
        }
        else {
            message = `We don't have member with this id: ${postId}`;
            fail(res, 404, null, message);
            return;
        }
    }
    catch (error) {
        return sendError(res,500,null,error.message)
    }
}
// ===========End:: Update testimonial===============

module.exports = { createContactUs, getMembers, getMember, deleteMember, updateMember }