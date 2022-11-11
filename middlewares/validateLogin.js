import { body } from "express-validator";

const validateLogin = [
    body("email")
        .isEmail()
        .withMessage("Please enter valid email")
        .bail()
        .trim(),
    body("password", "Please enter password").notEmpty(),
];

export default validateLogin;
