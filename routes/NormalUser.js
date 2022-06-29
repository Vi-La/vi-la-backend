const router = require("express").Router();
module.exports = { createNormalUser, getNormalUsers, getNormalUser, deleteNormalUser, updateNormalUser } = require('../controllers/NormalUser')

const { verifyToken, verifyTokenAndAdmin } = require('../middleware/verifyToken')

//====Start:: Create NormalUser=============//
router.post("/create", createNormalUser);
//====End:: Create NormalUser============//

//====Start:: Get NormalUsers=============//
router.get("/", verifyToken, getNormalUsers)
//====End:: Get NormalUsers=============//

//====Start:: Get NormalUser=============//
router.get("/:postId", verifyToken, getNormalUser)
//====End:: Get Community=============//

//====Start:: delete NormalUser=============//
router.delete("/:postId", verifyToken, deleteNormalUser)

//====End:: delete NormalUser=============//

//====Start:: Update NormalUser=============//
router.put("/:postId", verifyToken, updateNormalUser)

//====End:: Update NormalUser=============//


module.exports = router