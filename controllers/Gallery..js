const express = require('express')
const Gallery = require("../models/Gallery.");
const { success, fail, sendError } = require('../function/respond')

const createGallery = async (req, res) => {
    try {
        const { name, date, image } = req.body;
        const newGallery = new Gallery({
            name,
            date,
            image,
        });
        const gallerySaved = await newGallery.save();
        return success(res, 201, gallerySaved, "Gallery added successful")
    } catch (error) {
        return sendError(res, 500, null, error.message)
    }
}

const getGalleries = async (req, res) => {
    try {
        const gallery = await Gallery.find().sort("-createdAt");
        return success(res, 200, gallery, "retrieved Gallery")
    } catch (error) {
        return sendError(res, 500, null, error.message)
    }
}

const getGallery = async (req, res) => {
    const id = req.params.id;
    try {
        const gallery = await Gallery.findById(id)
        if (!gallery) return fail(res, 400, null, "Wrong Id");
        return success(res, 200, gallery, "retrieved Gallery")
    } catch (error) {
        return sendError(res, 500, null, error.message)
    }
}

const deleteGallery = async (req, res) => {
    const id = req.params.id;
    try {
        const gallery = await Gallery.findByIdAndDelete(id)
        if (!gallery) return fail(res, 400, null, "Gallery doesn't exist")
        return success(res, 200, null, "Gallery deleted successful")
    } catch (error) {
        return sendError(res, 500, null, error.message)
    }
}

const updateGallery = async (req, res) => {
    try {
        var id = req.params.id;
        const updatedGallery = await Gallery.findByIdAndUpdate({ _id: id }, req.body, {
            new: true,
        })
        if (updatedGallery) {
            message = `Gallery updated successful`;
            success(res, 200, updatedGallery, message);
            return;
        }
        else {
            message = `We don't have Gallery with this id: ${id}`;
            fail(res, 404, null, message);
            return;
        }
    }
    catch (error) {
        return sendError(res, 500, null, error.message)
    }
}

module.exports = { createGallery, getGalleries, getGallery, deleteGallery, updateGallery }