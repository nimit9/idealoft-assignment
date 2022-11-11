import { BadRequestError } from "../errors/index.js";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcryptjs";
import cloudinary from "../utils/cloundinary.js";
import db from "../db/connection.js";
import getAge from "../utils/getAge.js";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { validationResult } from "express-validator";

//Register
const register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        var err_string = "";
        errors.array().forEach((err) => {
            err_string += err.msg + ", ";
        });
        err_string = err_string.slice(0, -2);
        throw new BadRequestError(err_string);
    }

    if (!req.file) {
        throw new BadRequestError("Please provide profile image");
    }

    const { email, userType, dob } = req.body;
    if (userType === "Admin") {
        const [adminExistsResult, ,] = await db.query(
            "SELECT * from users where userType=?",
            [userType]
        );
        if (adminExistsResult.length >= 1) {
            throw new BadRequestError("Cannot create more than 1 admin");
        }
    }

    const [emailResults, ,] = await db.query(
        "SELECT email from users where email =?",
        [email]
    );
    if (emailResults.length) {
        throw new BadRequestError("Email already exists");
    }

    const { address, password, ...remainingUserFields } = req.body;

    const [aadharResults, ,] = await db.query(
        "SELECT aadharNumber from addresses where aadharNumber=?",
        [address.aadharNumber]
    );
    if (aadharResults.length) {
        throw new BadRequestError("Aadhar already exists");
    }

    const upload = await cloudinary.v2.uploader.upload(req.file.path);

    const addressId = uuidv4();
    const userId = uuidv4();

    const addressFields = { addressId, ...address };
    const insertAddressQuery =
        "INSERT into addresses SET " + db.escape(addressFields);
    await db.query(insertAddressQuery);

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const age = getAge(dob);

    const userFields = {
        addressId,
        userId,
        password: hashedPassword,
        ...remainingUserFields,
        age,
        image: upload.secure_url,
    };
    const insertUserQuery = "INSERT into users SET" + db.escape(userFields);

    await db.query(insertUserQuery);

    if (userType === "User") {
        await db.query(
            `INSERT INTO time_mappings (userId, seenTime, uploadTime) VALUES ('${userId}', now(), now())`
        );
    }

    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_LIFETIME,
    });
    res.status(StatusCodes.OK).json({
        user: { ...userFields, password: undefined },
        token,
    });
};

//Login
const login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password: enteredPassword } = req.body;
    const [result, ,] = await db.query("SELECT * from users where email =?", [
        email,
    ]);
    if (!result.length) {
        throw new BadRequestError("Email address not found");
    }

    const user = result[0];
    const password = user.password;

    const isMatch = await bcrypt.compare(enteredPassword, password);

    if (!isMatch) {
        throw new BadRequestError("Invalid credentials");
    }

    user.password = undefined;
    const token = jwt.sign({ userId: user.userId }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_LIFETIME,
    });
    res.status(StatusCodes.OK).json({
        user,
        token,
    });
};
const updateUser = async (req, res) => {
    //
};

export { register, login, updateUser };
