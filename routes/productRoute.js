const express = require("express");
const { postProduct, productList, productDetails, updateProduct, deleteProduct } = require("../controllers/productController");
const { requireAdmin } = require("../controllers/authController");

const router = express.Router();


router.post("/postproduct",requireAdmin,postProduct)
router.get("/productlist",productList)
router.get("/productdetails/:id",productDetails)
router.put("/updateproduct/:id",requireAdmin,updateProduct)
router.delete("/deleteproduct/:id",requireAdmin,deleteProduct)


module.exports = router