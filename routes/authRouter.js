import { login, register } from "../controllers/authController.js";

import express from "express";
import readFormData from "../middlewares/readFormData.js";
import upload from "../utils/multerUpload.js";
import validateLogin from "../middlewares/validateLogin.js";
import validateRegister from "../middlewares/validateRegister.js";

const router = express.Router();

router
    .route("/register")
    .post(upload.single("image"), readFormData, validateRegister, register);
router.route("/login").post(validateLogin, login);

export default router;
