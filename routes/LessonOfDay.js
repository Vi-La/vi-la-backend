const router = require("express").Router();
const {  createLesson, getLessons, getLesson, deleteLesson, updatedLesson } = require('../controllers/LessonOfDay')
const { verifyToken, verifyTokenAndAdmin } = require('../middleware/verifyToken')

router.route("/").post(createLesson).get(getLessons)
router.route("/:id").get(getLesson).delete(deleteLesson).put(updatedLesson)


module.exports = router