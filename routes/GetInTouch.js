const router = require("express").Router();
const {
    createLeader,
    getLeaders,
    getLeader,
    deleteLeader,
    updateLeader
} = require('../controllers/GetInTouch')

const { verifyToken, verifyTokenAndAdmin } = require('../middleware/verifyToken')

router.route("/").post(createLeader).get(getLeaders)
router.route("/:id").get(getLeader).delete(deleteLeader).put(updateLeader)


module.exports = router