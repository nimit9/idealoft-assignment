import "express-async-errors";

import adminRouter from "./routes/adminRouter.js";
import authRouter from "./routes/authRouter.js";
import authenticateUser from "./middlewares/auth.js";
import bodyParser from "body-parser";
import checkAdmin from "./middlewares/checkAdmin.js";
import config from "./db/config.js";
import cors from "cors";
import dotenv from "dotenv";
import { errorHandlerMiddleware } from "./middlewares/error-handler.js";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import mysql from "mysql2/promise";
import notFoundMiddleware from "./middlewares/not-found.js";
import userRouter from "./routes/userRouter.js";
import xss from "xss-clean";

dotenv.config();

const app = express();

if (process.env.NODE_ENV !== "production") {
    app.use(morgan("dev"));
}

app.use(express.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
app.use(cors());
app.use(helmet());
app.use(xss());
// app.use(fileUpload());

// **********Router *************
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", authenticateUser, userRouter);
app.use("/api/v1/admin", authenticateUser, checkAdmin, adminRouter);

// *******Middlewares ***************
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 4000;

const start = async () => {
    try {
        const db = mysql.createPool(config);

        await db.connect((err) => {
            if (err) {
                console.log("Unable to connect to db");
            }
        });
        app.listen(port, () => {
            console.log(` Server is running on port ${port}`);
        });
    } catch (error) {
        console.log(error);
    }
};

start();
