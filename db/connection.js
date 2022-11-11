import config from "./config.js";
import mysql from "mysql2/promise";

const db = mysql.createPool(config);

await db.connect((err) => {
    if (err) {
        console.log("Unable to connect to db");
    }
});

export default db;
