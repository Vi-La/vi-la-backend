const router = require("express").Router();
const {
    createTestimonial,
    getTestimonials,
    getTestimonial,
    deletedTestimonial,
    updatedTestimonial
} = require('../controllers/Testimonials')

const { verifyToken, verifyTokenAndAdmin } = require('../middleware/verifyToken')

router.route("/").post(createTestimonial).get(getTestimonials)
router.route("/:id").get(getTestimonial).delete(deletedTestimonial).put(updatedTestimonial)


module.exports = router