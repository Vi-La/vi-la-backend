const router = require("express").Router();
const {  createTestimonial, getTestimonials, getTestimonial, deletedTestimonial, updatedTestimonial } = require('../controllers/Testimonials')
const { verifyToken, verifyTokenAndAdmin } = require('../middleware/verifyToken')

//====Start:: Create Testimonial=============//
router.post("/create", createTestimonial);
//====End:: Create Testimonial============//

//====Start:: Get Testimonials============//
router.get("/", getTestimonials);
//====End:: Get Testimonials============//

//====Start:: Get Testimonial============//
router.get("/:postId", getTestimonial);
//====End:: Get Testimonial============//

//====Start:: Delete Testimonial============//
router.delete("/:postId",  deletedTestimonial);
//====End:: Delete Testimonial============//

//====Start:: Update Testimonial============//
router.put("/:postId", updatedTestimonial);
//====End:: Update Testimonial============//


module.exports = router