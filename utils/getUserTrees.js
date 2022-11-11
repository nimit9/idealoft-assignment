import db from "../db/connection.js";

export const getUserTrees = async (userId) => {
    const [result, ,] = await db.query(`SELECT * from trees where userId = ?`, [
        userId,
    ]);
    return result;
};
