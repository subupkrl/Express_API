const express = require("express")
const { postCategory, showCategoryList, categoryDetails, updateCategory, deleteCategory } = require("../controllers/categoryController")
const { requireAdmin } = require("../controllers/authController")


const router = express.Router()

router.post("/postcategory",requireAdmin,postCategory)
router.get("/categorylist",showCategoryList)
router.get("/categorydetails/:id",categoryDetails)
router.put("/updatecategory/:id",requireAdmin,updateCategory)
router.delete("/deletecategory/:id",requireAdmin,deleteCategory)


module.exports = router