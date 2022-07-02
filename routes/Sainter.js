const router = require("express").Router();
const { createSainter, getSainters, getSainter, deleteSainter, updatedSainter } = require('../controllers/Sainter')
const { verifyToken, verifyTokenAndAdmin } = require('../middleware/verifyToken')

//====Start:: Create Sainter=============//
router.post("/create",  createSainter);
//====End:: Create Sainter============//

//====Start:: Get Sainters============//
router.get("/", getSainters);
//====End:: Get Sainters============//

//====Start:: Get Sainter============//
router.get("/:postId",  getSainter);
//====End:: Get Sainter============//

//====Start:: Delete Sainter============//
router.delete("/:postId",  deleteSainter);
//====End:: Delete Sainter============//

//====Start:: Update Sainter============//
router.put("/:postId",  updatedSainter);
//====End:: Update Sainter============//


module.exports = router