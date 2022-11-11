import config from "./config.js";
import mysql from "mysql2";

const pool = mysql.createPool(config);
const db = pool.promise();

export default db;
