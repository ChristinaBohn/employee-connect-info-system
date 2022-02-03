const mysql = require('mysql2');
const util = require('util');

const connection = mysql.createConnection(
  {
    host: "localhost",
    // Your username
    user: "root",
    // Your password
    password: "password",
    database: "employees_db"
  }
);

// connection.query = util.promisify( db.query );

// Validate that connection is working
connection.connect(function (err) {
    if (err) {
        throw err;
    } else {
        console.log('Successfully connected to mysql')
    }
});

module.exports = connection;
