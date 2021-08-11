//import express 
let express = require('express'); 

//initialize the app 
let app = express(); 

let bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));



app.use(express.urlencoded({extended:true}));



//apply css 
app.use(express.static("public"));

//display images
app.use("/public", express.static('public'));

//import router 
let router = require('./routes');
app.use('/', router); 

//launch app to listen to specified port 
app.listen(8000, function () {
    console.log('Running on port 8000'); 
});