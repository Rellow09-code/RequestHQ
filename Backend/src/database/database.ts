import dotenv from "dotenv";
dotenv.config()

//connecting to the database
import pg from "pg";

const { Pool } = pg;
const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

export default pool