const router = require("express").Router();
const { createContactUs, getMembers, getMember, deleteMember, updateMember } = require('../controllers/GetInTouch')
const { verifyToken, verifyTokenAndAdmin } = require('../middleware/verifyToken')

//====Start:: Create Community member=============//
router.post("/create",  createContactUs);
//====End:: Create Community member============//

//====Start:: Get Community members=============//
router.get("/",getMembers)
//====End:: Get Community members=============//

//====Start:: Get Community member=============//
router.get("/:postId",  getMember)
//====End:: Get Community member=============//

//====Start:: delete Community member=============//
router.delete("/:postId",  deleteMember)

//====End:: delete Community member=============//

//====Start:: Update Community member=============//
router.put("/:postId",  updateMember)

//====End:: Update Community member=============//


module.exports = router