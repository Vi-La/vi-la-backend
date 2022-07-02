const jwt = require("jsonwebtoken");
const { success,fail,sendError } = require('../function/respond');
const User = require("../models/User");

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token;
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.JWT_SECRETE, (err, user) => {
            if (err) return fail(res,403,null,"Wrong Token!");
            req.user = user;
            next();
        })
    } else {
        return fail(res,401,null,"Not authenticated!");
        
    }
};

const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, async() => {
        const user  = await User.findById({_id:req.user.id})
        if (user.isAdmin) {
            next();
        } else {
            return fail(res,403,null,"Ask Admin permission");
        }
    });
};
module.exports = { verifyToken, verifyTokenAndAdmin }