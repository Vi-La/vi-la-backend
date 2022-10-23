const express = require('express')
const News = require("../models/News");
const { success, fail, sendError } = require('../function/respond')

const createPost = async (req, res) => {
    const { title, description, image } = req.body;
    const newPost = new News({
        title,
        description,
        image
    });
    try {
        const findNews = await News.findOne({ title: title });
        if (findNews) return sendError(res, 409, "Title already exist!", null);

        const newsSaved = await newPost.save();
        return success(res, 201, newsSaved, "News have been created")
    } catch (error) {
        return sendError(res,500,null,error.message)
    }
}

const getPosts = async (req, res) => {
    try {
        const posts = await News.find().sort("-createdAt");
        return success(res, 200, posts, "retrieved all posts")
    } catch (error) {
        return sendError(res,500,null,error.message)
    }
}

const getPost = async (req, res) => {
    const id = req.params.id;
    try {
        const post = await News.findById(id)
        if (!post) return fail(res, 400, null, "Wrong Id");
        return success(res, 200, post, "retrieved post")
    } catch (error) {
        return sendError(res,500,null,error.message)
    }
}

const deletedPost = async (req, res) => {
    const id = req.params.id;
    try {
        const post = await News.findByIdAndDelete(id)
        if (!post) return fail(res, 400, null, "Post doesn't exist")
        return success(res, 200, null, "Post deleted successful")
    } catch (error) {
        return sendError(res,500,null,error.message)
    }
}

const updatedPost = async (req, res) => {
    try {
        var id = req.params.id;
        const updatedNews = await News.findByIdAndUpdate({ _id: id }, req.body, {
            new: true,
        })
        if (updatedNews) {
            return success(res, 201, "Post updated successful", updatedNews)
        }
        else {
            return fail(res, 404, `We don't have Post with this id ${id}`, null)
        }
    } catch (error) {
        res.status(200).json({ status: 'fail', message: error });
    }
}

module.exports = { createPost, getPosts, getPost, deletedPost, updatedPost };