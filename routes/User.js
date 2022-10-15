const router = require("express").Router();

const {
    createUser,
    getUsers,
    getUser,
    deletedUser,
    updatedUser,
    changeUserPass,
    userLogin
} = require('../controllers/User')

const { verifyToken, verifyTokenAndAdmin } = require('../middleware/verifyToken')


router.post("/login", userLogin);
router.put("/change/password/:id", changeUserPass);
router.route("/").post(createUser).get(getUsers)
router.route("/:id").get(getUser).delete(deletedUser).put(updatedUser)

module.exports = router