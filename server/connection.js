const mysql = require('mysql');

const con = mysql.createConnection({
    host: 'localhost',
    username: 'root',
    password: 'z10mz10m',
    database:'BANK'
})

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected to BANK database!");
});
  
module.exports = con;