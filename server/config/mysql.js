var mysql = require("mysql");
const config = require('./config');

// config for your database
var MYSQL = {
    host: config.mysql,
    user: 'root',
    password: 'Printer1',
    database: 'wms'
};

// connect to your database
var sql = mysql.createConnection(MYSQL, function (err) {
    if (err) console.log(err);
});

sql.connect();

module.exports = sql;

