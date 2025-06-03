const express = require("express")
const { postUser } = require("../controllers/authController")
const router = express.Router()

router.post("/register",postUser)

module.exports = router