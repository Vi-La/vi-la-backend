const router = require("express").Router();
const { createPost, getPosts, getPost, deletedPost, updatedPost } = require('../controllers/News')
const { verifyToken, verifyTokenAndAdmin } = require('../middleware/verifyToken')

//====Start:: Create Post=============//
router.post("/create", createPost);
//====End:: Create Post============//

//====Start:: Get Post============//
router.get("/", getPosts);
//====End:: Get Posts============//

//====Start:: Get Post============//
router.get("/:postId", getPost);
//====End:: Get Post============//

//====Start:: Delete Post============//
router.delete("/:postId", verifyTokenAndAdmin, deletedPost);
//====End:: Delete Post============//

//====Start:: Update post============//
router.put("/:postId", verifyTokenAndAdmin, updatedPost);
//====End:: Update post============//

module.exports = router