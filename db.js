var mysql = require("mysql"); 
//conection with server
var connection = mysql.createConnection({
    host        : 'localhost',
    user        : 'root',
    password    : 'root',
    database    : 'MVC_music'
})
connection.connect(function(error) { if (error) console.log(error);}); 

module.exports = connection; 