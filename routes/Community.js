const router = require("express").Router();
module.exports = { createCommunity, getCommunities, getCommunity, deleteCommunity, updateCommunity } = require('../controllers/Community')

const { verifyToken, verifyTokenAndAdmin } = require('../middleware/verifyToken')

//====Start:: Create Community=============//
router.post("/create", createCommunity);
//====End:: Create Community============//

//====Start:: Get Communities=============//
router.get("/",getCommunities)
//====End:: Get Communities=============//

//====Start:: Get Community=============//
router.get("/:postId",  getCommunity)
//====End:: Get Community=============//

//====Start:: delete Community=============//
router.delete("/:postId",  deleteCommunity)

//====End:: delete Community=============//

//====Start:: Update Community=============//
router.put("/:postId",  updateCommunity)

//====End:: Update Community=============//


module.exports = router