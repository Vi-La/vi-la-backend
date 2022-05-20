const router = require("express").Router();

const { createUser, getUsers, getUser, deletedUser, updatedUser, userLogin } = require('../controllers/User')
const { verifyToken, verifyTokenAndAdmin } = require('../middleware/verifyToken')


//====Start:: Create User============//
router.post("/create", createUser);
//====End:: Create User============//

//====Start:: Get Users============//
router.get("/", getUsers);
//====End:: Get Users============//

//====Start:: Get User============//
router.get("/:userId", verifyToken, getUser);
//====End:: Get User============//

//====Start:: Delete User============//
router.delete("/:userId", verifyTokenAndAdmin, deletedUser);
//====End:: Delete User============//

//====Start:: Update User============//
router.put("/:userId", verifyTokenAndAdmin, updatedUser);
//====End:: Update User============//

//====Start:: Login============//
router.post("/login", userLogin)
//====End:: Login============//

module.exports = router