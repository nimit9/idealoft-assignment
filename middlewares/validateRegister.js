import { body } from "express-validator";

const validateRegister = [
    body("email")
        .isEmail()
        .withMessage("Please enter valid email")
        .bail()
        .trim(),
    body("password", "Password Must Be at Least 8 Characters").isLength({
        min: 8,
    }),
    body("firstName", "Please enter first name").notEmpty(),
    body("lastName", "Please enter last name").notEmpty(),
    body("gender", "Please enter gender").notEmpty(),
    body("dob").notEmpty().isDate().withMessage("Please enter valid DOB"),
    body("userType")
        .notEmpty()
        .isIn(["Admin", "User"])
        .withMessage("Please enter valid user type"),
    body("address", "Please enter address values").notEmpty(),
    body("address.city")
        .if(body("address").exists())
        .notEmpty()
        .withMessage("Please enter city"),
    body("address.state")
        .if(body("address").exists())
        .notEmpty()
        .withMessage("Please enter state"),
    body("address.area")
        .if(body("address").exists())
        .notEmpty()
        .withMessage("Please enter area"),
    body("address.pincode")
        .if(body("address").exists())
        .notEmpty()
        .withMessage("Please provide pincode")
        .bail()
        .isNumeric()
        .withMessage("Please enter valid pincode"),
    body("address.aadharNumber")
        .if(body("address").exists())
        .notEmpty()
        .withMessage("Please provide aadhar number")
        .bail()
        .isLength(12)
        .isNumeric()
        .withMessage("Please enter valid aadhar number"),
    body("address.addressLine1")
        .if(body("address").exists())
        .notEmpty()
        .withMessage("Please provide proper address"),
];

export default validateRegister;
