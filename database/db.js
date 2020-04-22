var mysql = require('mysql');

var connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'root',
    port : 3306,
    database : 'todo_list'
});

connection.connect();

module.exports = connection;