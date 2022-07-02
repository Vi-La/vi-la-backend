const jwt = require("jsonwebtoken")
const dotenv  = require("dotenv")

dotenv.config()

const sendError = (res , code , data , message) => {
    res.status(code).json({"status": "error" , data , message});
}

const success = (res , code , data , message) => {
    res.status(code).json({"status":"success",
    result:data.length,
     data ,
     message
    });
}

const fail = (res , code , data , message) => {
    res.status(code).json({"status":"Fail", data , message});
}


const generateToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRETE,{
        expiresIn:process.env.JWT_EXPIRES_IN
    })
}
module.exports = { sendError , success , fail,generateToken }