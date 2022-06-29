const express = require('express')
const News = require("../models/News");
const { success, fail, sendError } = require('../function/respond')

// ===========Start:: create a new post===============
const createPost = async (req, res) => {
    const avata = 'https://cdn.pixabay.com/photo/2012/04/25/00/03/dove-41260__480.png';
    const { title, desc, newsImage } = req.body;
    const newPost = new News({
        title,
        desc,
        newsImage
    });
    try {
        const newsSaved = await newPost.save();
        return success(res, 201, newsSaved, "News have been created")
    } catch (error) {
        return sendError(res,500,null,error.message)
    }
}
// ===========End: create a new post===============

// ===========Start: Get Posts===============
const getPosts = async (req, res) => {
    try {
        const posts = await News.find().sort({ createdAt: -1 });
        return success(res, 200, posts, "retrieved all posts")
    } catch (error) {
        return sendError(res,500,null,error.message)
    }
}
// ===========End:: Get Posts===============

// ===========Start:: Get Post===============
const getPost = async (req, res) => {
    const postId = req.params.postId;
    try {
        const post = await News.findById(postId)
        if (!postId) return fail(res, 400, null, "Wrong Id");
        return success(res, 200, post, "retrieved post")
    } catch (error) {
        return sendError(res,500,null,error.message)
    }
}
// ===========End:: Get Post===============

// ===========Start:: Delete Post===============
const deletedPost = async (req, res) => {
    const postId = req.params.postId;
    try {
        const post = await News.findByIdAndDelete(postId)
        if (!post) return fail(res, 400, null, "Post doesn't exist")
        return success(res, 200, null, "Post deleted successful")
    } catch (error) {
        return sendError(res,500,null,error.message)
    }
}
// ===========End:: Delete Post===============

// ===========Start:: Update Post===============
const updatedPost = async (req, res) => {
    try {
        var postId = req.params.postId;
        let bodyData = req.body;
        let data = await News.findOneAndUpdate(
            { _id: postId },
            { $set: bodyData });
        const findeUpdatePost = await News.findOne({ _id: postId });
        if (findeUpdatePost) {
            message = `Post updated successful`;
            success(res, 200, findeUpdatePost, message);
            return;
        }
        else {
            message = `We don't have Post with this id ${postId}`;
            fail(res, 404, null, message);
            return;
        }
    }
    catch (error) {
        return sendError(res,500,null,error.message)
    }
}

// ===========End:: Update Post===============



module.exports = { createPost, getPosts, getPost, deletedPost, updatedPost };