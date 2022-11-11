import dotenv from "dotenv";

dotenv.config();
const config = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    dateStrings: true,
    multipleStatements: true,
};
export default config;
