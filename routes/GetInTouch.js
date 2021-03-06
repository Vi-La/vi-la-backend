const router = require("express").Router();
const { createContactUs, getMembers, getMember, deleteMember, updateMember } = require('../controllers/GetInTouch')
const { verifyToken, verifyTokenAndAdmin } = require('../middleware/verifyToken')

//====Start:: Create Community member=============//
router.post("/create", verifyTokenAndAdmin, createContactUs);
//====End:: Create Community member============//

//====Start:: Get Community members=============//
router.get("/",getMembers)
//====End:: Get Community members=============//

//====Start:: Get Community member=============//
router.get("/:postId", verifyTokenAndAdmin, getMember)
//====End:: Get Community member=============//

//====Start:: delete Community member=============//
router.delete("/:postId", verifyTokenAndAdmin, deleteMember)

//====End:: delete Community member=============//

//====Start:: Update Community member=============//
router.put("/:postId", verifyTokenAndAdmin, updateMember)

//====End:: Update Community member=============//


module.exports = router