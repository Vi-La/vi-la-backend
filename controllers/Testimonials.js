const express = require('express')
const Testimonial = require("../models/Testimonials");
const { success, fail, sendError } = require('../function/respond')

const createTestimonial = async (req, res) => {
    const { name, title, message, image } = req.body;
    const newTestimonial = new Testimonial({
        name,
        title,
        message,
        image
    });
    try {
        const testimonialSaved = await newTestimonial.save();
        return success(res, 201, testimonialSaved, "Testimonial have been created")
    } catch (error) {
        return sendError(res,500,null,error.message)
    }
}

const getTestimonials = async (req, res) => {
    try {
        const testimonials = await Testimonial.find().sort("-createdAt");
        return success(res, 200, testimonials, "retrieved all testimonials")
    } catch (error) {
        return sendError(res,500,null,error.message)
    }
}

const getTestimonial = async (req, res) => {
    const id = req.params.id;
    try {
        const testimonial = await Testimonial.findById(id)
        if (!testimonial) return fail(res, 400, null, "Wrong Id");
        return success(res, 200, testimonial, "retrieved testimonial")
    } catch (error) {
        return sendError(res,500,null,error.message)
    }
}

const deletedTestimonial = async (req, res) => {
    const id = req.params.id;
    try {
        const testimonial = await Testimonial.findByIdAndDelete(id)
        if (!testimonial) return fail(res, 400, null, "testimonial doesn't exist")
        return success(res, 200, null, "testimonial deleted successful")
    } catch (error) {
        return sendError(res,500,null,error.message)
    }
}

const updatedTestimonial = async (req, res) => {
    try {
        var id = req.params.id;
        const updatedUser = await Testimonial.findByIdAndUpdate({ _id: id }, req.body, {
            new: true,
        })
        if (updatedUser) {
            return success(res, 201, "Testimonial updated successful", updatedUser)
        }
        else {
            return fail(res, 404, `We don't have Testimonial with this id ${id}`, null)
        }
    } catch (error) {
        res.status(200).json({ status: 'fail', message: error });
    }
}

module.exports = { createTestimonial, getTestimonials, getTestimonial, deletedTestimonial, updatedTestimonial };