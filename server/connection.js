const mysql = require('mysql');

const database = mysql.createConnection({
    host: 'localhost',
    username: 'root',
    password: 'z10mz10m',
    database:'BANK'
})

database.connect(function(err) {
    if (err) throw err;
    console.log("Connected to BANK database!");
});
  
module.exports = database;