const mysql = require('mysql')

const connectionMySQL = mysql.createConnection({
  host: 'localhost',
  port: '3306',
  user: 'dv259_andri',
  password: '123456',
  database: 'dv259321_inventory'
});

module.exports = connectionMySQL;