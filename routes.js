let express = require('express'); 
let router = express.Router(); 

//***********************MVC routes***********************//
let homepageController = require('./controllers/homepageController.js');
let instrumentsController = require('./controllers/instrumentsController.js');
//let artistController = require('./controllers/artistController.js');
//let settingsArtistController = require('./controllers/settingsArtistController.js')

module.exports = router; 