const express = require("express");
const { postProduct, productList, productDetails, updateProduct, deleteProduct } = require("../controllers/productController");
const { requireAdmin } = require("../controllers/authController");

const router = express.Router();
const {upload,handleMulterError} = require("../middleware/fileupload");
const { productValidation, validation, categoryValidation } = require("../validation/validator");

router.post("/postproduct",upload.single('product_image'),productValidation,validation,postProduct)
router.get("/productlist",productList)
router.get("/productdetails/:id",productDetails)
router.put("/updateproduct/:id",categoryValidation,validation,updateProduct)
router.delete("/deleteproduct/:id",requireAdmin,deleteProduct)
router.use(handleMulterError)


module.exports = router