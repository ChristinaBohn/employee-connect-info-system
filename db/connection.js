const mysql = require("mysql2")

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "employees"
});

connection.connect(function (err) {
    if (err) {
        throw err;
    } else {
        console.log('Successfully connected to mysql')
    }
});

module.exports = connection;
