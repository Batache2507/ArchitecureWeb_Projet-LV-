var mysql = require("mysql"); 
//conection with server
var connection = mysql.createConnection({
    host        : 'localhost',
    user        : 'root',
    password    : 'root',
    database    : 'mvc_music'
})
connection.connect(function(error) { if (error) console.log(error);}); 

module.exports = connection; 