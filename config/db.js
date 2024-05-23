const mysql = require("mysql2/promise");
require("dotenv/config");

let _DB;

const mySQLConnect = async () => {
    try {
        _DB = await mysql.createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            database: process.env.DB_NAME,
            password: process.env.DB_PASSWORD,
            namedPlaceholders: true,
            waitForConnections: true,
            connectionLimit: 200,
            maxIdle: 200, // max idle connections, the default value is the same as `connectionLimit`
            idleTimeout: 25200000, // idle connections timeout set to 7 hours
            queueLimit: 0,
            enableKeepAlive: true,
            keepAliveInitialDelay: 0,
        });
        // Try acquiring a connection to ensure the pool is working
        const connection = await _DB.getConnection();
        connection.release();
        console.log("Database connected sucessfully!")
        return connection;
    } catch (error) {
        throw error;
    }
};



// Create a new class
const db = {
    async execute(query, values) {
        return await _DB.execute(query, values);
    },
};

module.exports = { db, mySQLConnect };
