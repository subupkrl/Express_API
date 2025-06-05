const express = require("express")
const { postUser, postEmailConfirmation, signIn, forgotPassword, resetPassword, userList, userDetails,  requireAdmin } = require("../controllers/authController")
const router = express.Router()

router.post("/register",postUser)
router.put("/confirmation/:token",postEmailConfirmation)
router.post("/signin",signIn)
router.post("/forgot/password",forgotPassword)
router.put("/reset/password/:token",resetPassword)
router.get("/user/list",requireAdmin,userList)
router.get("/user/details/:id",userDetails)

module.exports = router