const {body,validationResult} = require("express-validator")

//category validation
exports.categoryValidation = [
    body("category_name")
    .notEmpty().withMessage("Category name is required.")
    .isLength({min:3}).withMessage("Category name must be of at least 3 characters.")
    .isString().withMessage("category name must be a string")
]

//product validation
exports.productValidation = [
    body("product_name")
    .notEmpty().withMessage("Product name is required.")
    .isLength({min:3}).withMessage("Product name must be of at least 3 characters.")
    .isString().withMessage("product name must be a string"),

    body("product_price")
    .notEmpty().withMessage("Product price is required").
    isNumeric().withMessage("Price must be a numeric value")
    .isFloat({min:0}).withMessage("Price must be a positive number"),

    body("countInStock")
    .notEmpty().withMessage("Product stock is required").
    isNumeric().withMessage("Stock must be a numeric value")
    .isInt({min:0}).withMessage("Price must be a positive number"),

    body("product_description")
    .notEmpty().withMessage("Product description is required.")
    .isLength({min:20}).withMessage("Product description must be of at least 20 characters.")
    .isString().withMessage("product description must be a string"),

    body("category")
    .notEmpty().withMessage("Category name is required.")
    .isString().withMessage("category must be a string"),
]

//user validation
exports.userValidation=[
    body("name")
    .notEmpty().withMessage("Name is required.")
    .isLength({min:3}).withMessage("Name must be of at least 3 characters.")
    .isString().withMessage("name must be a string"),

    body("email")
    .notEmpty().withMessage("Email is required.")
    .isEmail().withMessage("Email format is incorrect"),

    body("password")
    .notEmpty().withMessage("Password is required.")
    .isLength({min:8}).withMessage("Password must be 8 characters or more.")
    .matches(/[a-z]/).withMessage("Password must contain at least one lower case")
    .matches(/[A-Z]/).withMessage("Password must contain at least one upper case letter")
    .matches(/[0-9]/).withMessage("Password must contain at least one numeric value")
    .matches(/[@#$%^&*_-]/).withMessage("Password must contain at least one special character")
]

//password validation
exports.passwordValidation=[
    body("password")
    .notEmpty().withMessage("Password is required.")
    .isLength({min:8}).withMessage("Password must be 8 characters or more.")
    .matches(/[a-z]/).withMessage("Password must contain at least one lower case")
    .matches(/[A-Z]/).withMessage("Password must contain at least one upper case letter")
    .matches(/[0-9]/).withMessage("Password must contain at least one numeric value")
    .matches(/[@#$%^&*_-]/).withMessage("Password must contain at least one special character")
]

//validation result handler
exports.validation = (req,res,next)=>{
    const error = validationResult(req)
    if(error.isEmpty()){
        return next()
    }
    return res.status(400).json({error:error.array()[0].msg})
}