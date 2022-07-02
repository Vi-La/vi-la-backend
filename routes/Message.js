const router = require("express").Router();
const { createMessage, getMessages, getMessage, deletedMessage } = require('../controllers/Message')
const { verifyToken, verifyTokenAndAdmin } = require('../middleware/verifyToken')

//====Start:: Create Message=============//
router.post("/send", createMessage);
//====End:: Create Message============//

//====Start:: Get Messages============//
router.get("/", verifyTokenAndAdmin, getMessages);
//====End:: Get Messages============//

//====Start:: Get Message============//
router.get("/:postId", verifyTokenAndAdmin, getMessage);
//====End:: Get Message============//

//====Start:: Delete Message============//
router.delete("/:postId", verifyTokenAndAdmin, deletedMessage);
//====End:: Delete Message============//

module.exports = router