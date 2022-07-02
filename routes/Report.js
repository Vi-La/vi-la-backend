const router = require("express").Router();
const { createReport, getReports, getReport, deletedReport } = require('../controllers/Report')
const { verifyToken, verifyTokenAndAdmin } = require('../middleware/verifyToken')

//====Start:: Create Message=============//
router.post("/send", createReport);
//====End:: Create Message============//

//====Start:: Get Messages============//
router.get("/",  getReports);
//====End:: Get Messages============//

//====Start:: Get Message============//
router.get("/:postId",  getReport);
//====End:: Get Message============//

//====Start:: Delete Message============//
router.delete("/:postId",  deletedReport);
//====End:: Delete Message============//

module.exports = router