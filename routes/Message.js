const router = require("express").Router();
const {
    sendMessage,
    getMessages,
    getMessage,
    deletedMessage
} = require('../controllers/Message')

const { verifyToken, verifyTokenAndAdmin } = require('../middleware/verifyToken')

router.route("/").post(sendMessage).get(getMessages)
router.route("/:id").get(getMessage).delete(deletedMessage)

module.exports = router