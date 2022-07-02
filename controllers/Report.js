const express = require('express')
const sendEmail = require("../utils/email");

const Report = require("../models/Report");
const { success, fail, sendError } = require('../function/respond')


// ===========Start:: create Report===============
const createReport = async (req, res) => {
    try {
        const { senderName, diocese, reportMessage } = req.body;
        const newReport = new Report({
            senderName,
            diocese,
            reportMessage
        });

        const message = ` ${reportMessage}`;
        await sendEmail({
            email: newReport.email,
            subject: `Report from ${newReport.diocese}`,
            message,
        });
        const reportSaved = await newReport.save();
        return success(res, 201, reportSaved, "Report have been sent successful")
    } catch (error) {
        return sendError(res, 500, null, error.message)
    }
}
// ===========End: create a new Report===============

// ===========Start: Get Reports===============
const getReports = async (req, res) => {
    try {
        const reports = await Report.find();
        return success(res, 200, reports, "retrieved all Messages")
    } catch (error) {
        return sendError(res, 500, null, error.message)
    }
}
// ===========End:: Get Reports===============

// ===========Start:: Get Report===============
const getReport = async (req, res) => {
    const rprtId = req.params.postId;
    try {
        const report = await Report.findById(rprtId)
        if (!rprtId) return fail(res, 400, null, "Wrong Id");
        return success(res, 200, report, "retrieved Message")
    } catch (error) {
        return sendError(res, 500, null, error.message)
    }
}
// ===========End:: Get Report===============

// ===========Start:: Delete Report===============
const deletedReport = async (req, res) => {
    const rprtId = req.params.postId;
    try {
        const report = await Report.findByIdAndDelete(rprtId)
        if (!report) return fail(res, 400, null, "Report doesn't exist")
        return success(res, 200, null, "Report deleted successful")
    } catch (error) {
        return sendError(res, 500, null, error.message)
    }
}
// ===========End:: Delete Report===============

module.exports = { createReport, getReports, getReport, deletedReport };