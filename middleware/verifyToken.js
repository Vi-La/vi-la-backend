const jwt = require("jsonwebtoken");
const { success,fail,sendError } = require('../function/respond')

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token;
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.JWT_SEC, (err, user) => {
            if (err) return fail(res,403,null,"Wrong Token!");
            req.user = user;
            next();
        })
    } else {
        return fail(res,401,null,"Not authenticated!");
        
    }
};

const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next();
        } else {
            return fail(res,403,null,"Ask Admin permission");
        }
    });
};
module.exports = { verifyToken, verifyTokenAndAdmin }