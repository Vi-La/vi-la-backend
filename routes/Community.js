const router = require("express").Router();
const {
    createCommunity,
    getCommunities,
    getCommunity,
    deleteCommunity,
    updateCommunity
} = require('../controllers/Community')

const { verifyToken, verifyTokenAndAdmin } = require('../middleware/verifyToken')

router.route("/").post(createCommunity).get(getCommunities)
router.route("/:id").get(getCommunity).delete(deleteCommunity).put(updateCommunity)

module.exports = router