const express = require("express")
const { postUser, postEmailConfirmation, signIn, forgotPassword, resetPassword } = require("../controllers/authController")
const router = express.Router()

router.post("/register",postUser)
router.put("/confirmation/:token",postEmailConfirmation)
router.post("/signin",signIn)
router.post("/forgot/password",forgotPassword)
router.put("/reset/password/:token",resetPassword)

module.exports = router