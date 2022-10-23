const router = require("express").Router();
const { createGallery, getGalleries, getGallery, deleteGallery, updateGallery } = require('../controllers/Gallery.')
const { verifyToken, verifyTokenAndAdmin } = require('../middleware/verifyToken')



router.route("/").post(createGallery).get(getGalleries)
router.route("/:id").get(getGallery).delete(deleteGallery).put(updateGallery)


module.exports = router