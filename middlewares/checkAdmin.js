import { UnAuthenticatedError } from "../errors/index.js";
import db from "../db/connection.js";

const checkAdmin = async (req, res, next) => {
    const { userId } = req.user;

    try {
        const [[user], ,] = await db.query(
            `SELECT userType from users where userId=${db.escape(userId)}`
        );
        if (user.userType !== "Admin") {
            throw new UnAuthenticatedError("Only admin can access this route");
        }
        next();
    } catch (error) {
        throw new UnAuthenticatedError("Only admin can access this route");
    }
};

export default checkAdmin;
