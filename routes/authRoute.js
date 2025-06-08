const express = require("express")
const { postUser, postEmailConfirmation, signIn, forgotPassword, resetPassword, userList, userDetails,  requireAdmin } = require("../controllers/authController")
const { userValidation, validation, passwordValidation } = require("../validation/validator")
const router = express.Router()

router.post("/register",userValidation,validation,postUser)
router.put("/confirmation/:token",postEmailConfirmation)
router.post("/signin",signIn)
router.post("/forgot/password",forgotPassword)
router.put("/reset/password/:token",passwordValidation,validation,resetPassword)
router.get("/user/list",requireAdmin,userList)
router.get("/user/details/:id",userDetails)

module.exports = router