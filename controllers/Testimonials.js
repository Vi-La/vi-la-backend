const express = require('express')
const Testimonial = require("../models/Testimonials");
const { success, fail, sendError } = require('../function/respond')

// ===========Start:: create a new testimonials===============
const createTestimonial = async (req, res) => {
    const avata = 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909__480.png';
    const { name, message } = req.body;
    const newTestimonial = new Testimonial({
        name,
        message,
        image: avata
    });
    try {
        const testimonialSaved = await newTestimonial.save();
        return success(res, 201, testimonialSaved, "Testimonial have been created")
    } catch (error) {
        return sendError(res,500,null,error.message)
    }
}
// ===========End: create a new testimonials===============

// ===========Start: Get testimonials===============
const getTestimonials = async (req, res) => {
    try {
        const testimonials = await Testimonial.find();
        return success(res, 200, testimonials, "retrieved all testimonials")
    } catch (error) {
        return sendError(res,500,null,error.message)
    }
}
// ===========End:: Get testimonials===============

// ===========Start:: Get testimonial===============
const getTestimonial = async (req, res) => {
    const postId = req.params.postId;
    try {
        const testimonial = await Testimonial.findById(postId)
        if (!postId) return fail(res, 400, null, "Wrong Id");
        return success(res, 200, testimonial, "retrieved testimonial")
    } catch (error) {
        return sendError(res,500,null,error.message)
    }
}
// ===========End:: Get testimonial===============

// ===========Start:: Delete testimonial===============
const deletedTestimonial = async (req, res) => {
    const postId = req.params.postId;
    try {
        const testimonial = await Testimonial.findByIdAndDelete(postId)
        if (!testimonial) return fail(res, 400, null, "Post doesn't exist")
        return success(res, 200, null, "testimonial deleted successful")
    } catch (error) {
        return sendError(res,500,null,error.message)
    }
}
// ===========End:: Delete testimonial===============

// ===========Start:: Update testimonial===============
const updatedTestimonial = async (req, res) => {
    try {
        var postId = req.params.postId;
        let bodyData = req.body;
        let data = await Testimonial.findOneAndUpdate(
            { _id: postId },
            { $set: bodyData });
        const findeUpdaTetestimonial = await Testimonial.findOne({ _id: postId });
        if (findeUpdaTetestimonial) {
            message = `testimonials updated successful`;
            success(res, 200, findeUpdaTetestimonial, message);
            return;
        }
        else {
            message = `We don't have testimonials with this id ${postId}`;
            fail(res, 404, null, message);
            return;
        }
    }
    catch (error) {
        return sendError(res,500,null,error.message)
    }
}
// ===========End:: Update testimonial===============

module.exports = { createTestimonial, getTestimonials, getTestimonial, deletedTestimonial, updatedTestimonial };