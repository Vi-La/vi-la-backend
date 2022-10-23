const router = require("express").Router();
const {
    createPost,
    getPosts,
    getPost,
    deletedPost,
    updatedPost } = require('../controllers/News')
const { verifyToken, verifyTokenAndAdmin } = require('../middleware/verifyToken')

router.route("/").post(createPost).get(getPosts)
router.route("/:id").get(getPost).delete(deletedPost).put(updatedPost)

module.exports = router