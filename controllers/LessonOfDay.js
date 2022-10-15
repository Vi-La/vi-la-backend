const express = require('express')
const LessonOfDay = require("../models/LessonOfDay");
const { success, fail, sendError } = require('../function/respond')


const createLesson = async (req, res) => {
    try {
    const { title, description, image } = req.body;
    const lessonOfDay = new LessonOfDay({
        title: title,
        description: description,
        image: image
    });
        const findLesson = await LessonOfDay.findOne({ title: title });
        if (findLesson) return sendError(res, 409, "This Title already exist!", null);

        const lessonSaved = await lessonOfDay.save();
        return success(res, 201, lessonSaved, "Lesson of the day added successful")
    } catch (error) {
        return sendError(res,500,null,error.message)
    }
}

const getLessons = async (req, res) => {
    try {
        const lessons = await LessonOfDay.find().sort({ createdAt: -1 });
        return success(res, 200, lessons, "retrieved Lessons")
    } catch (error) {
        return sendError(res,500,null,error.message)
    }
}

const getLesson = async (req, res) => {
    try {
        const lesson = await LessonOfDay.findById(req.params.id)
        if (!lesson) return fail(res, 400, "Lesson doesn't exist", null)
        return success(res, 200, lesson, "retrieved Lesson")

    } catch (error) {
        return sendError(res, 500, error.message, null)
    }
}

const deleteLesson = async (req, res) => {
    const id = req.params.id;
    try {
        const lesson = await LessonOfDay.findByIdAndDelete(id)
        if (!lesson) return fail(res, 400, null, "Lesson doesn't exist")
        return success(res, 200, null, "Lesson has been removed")
    } catch (error) {
        return sendError(res,500,null,error.message)
    }
}

const updatedLesson = async (req, res) => {
    try {
        var id = req.params.id;
        const updatedLesson = await LessonOfDay.findByIdAndUpdate({ _id: id }, req.body, {
            new: true,
        })
        if (updatedLesson) {
            return success(res, 201, "Lesson updated successful", updatedLesson)
        }
        else {
            return fail(res, 404, `We don't have Lesson with this id ${id}`, null)
        }
    } catch (error) {
        res.status(200).json({ status: 'fail', message: error });
    }
}

module.exports = { createLesson, getLessons, getLesson, deleteLesson, updatedLesson };