const router = require("express").Router();
module.exports = { createHistory, getHistories, getHistory, deleteHistory, updateHistory } = require('../controllers/History')

const { verifyToken, verifyTokenAndAdmin } = require('../middleware/verifyToken')

//====Start:: Create Community=============//
router.post("/create", createHistory);
//====End:: Create Community============//

//====Start:: Get Communities=============//
router.get("/",getHistories)
//====End:: Get Communities=============//

//====Start:: Get Community=============//
router.get("/:postId", getHistory)
//====End:: Get Community=============//

//====Start:: delete Community=============//
router.delete("/:postId", deleteHistory)

//====End:: delete Community=============//

//====Start:: Update Community=============//
router.put("/:postId", updateHistory)

//====End:: Update Community=============//


module.exports = router