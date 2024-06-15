require('dotenv').config();
const mysql = require("mysql2/promise");

const dbConnection = async () => {
  try {
    const database = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });
    console.log("Database connected");
    return database;
  } catch (error) {
    console.log(error);
  }
}

module.exports = dbConnection;
