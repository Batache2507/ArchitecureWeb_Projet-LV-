//import express 
let express = require('express'); 

//initialize the app 
let app = express(); 

//let bodyParser = require('body-parser');

//import router 
//router = require('./routes');
//app.use('/', router); 

//message example 
app.get('/', function (request, response) {
    response.send('Hello World');
});

//launch app to listen to specified port 
app.listen(8000, function () {
    console.log('Running on port 8000'); 
});