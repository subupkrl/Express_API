const express = require("express");
const { postProduct, productList, productDetails, updateProduct, deleteProduct } = require("../controllers/productController");

const router = express.Router();


router.post("/postproduct",postProduct)
router.get("/productlist",productList)
router.get("/productdetails/:id",productDetails)
router.put("/updateproduct/:id",updateProduct)
router.delete("/deleteproduct/:id",deleteProduct)


module.exports = router