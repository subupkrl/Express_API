const express = require("express")
const { postUser, postEmailConfirmation } = require("../controllers/authController")
const router = express.Router()

router.post("/register",postUser)
router.put("/confirmation/:token",postEmailConfirmation)

module.exports = router