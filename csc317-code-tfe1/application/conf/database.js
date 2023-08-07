// get the client
require('dotenv').config();
const mysql = require('mysql2');

// Create the connection pool. The pool-specific settings are the defaults
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    waitForConnections: true,
    connectionLimit: 10,

    queueLimit: 0,

}).promise();
module.exports = pool;