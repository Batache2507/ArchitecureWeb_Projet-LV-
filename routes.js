let express = require('express'); 
let router = express.Router(); 

//***********************MVC routes***********************//
let homepageController = require('./controllers/homepageController.js');
let instrumentsController = require('./controllers/instrumentsController.js');
//let artistController = require('./controllers/artistController.js');
//let settingsArtistController = require('./controllers/settingsArtistController.js')

//les routes 
router.get('/', function (request, response) {
    response.redirect ('/homepage');
});

router.get('/homepage', homepageController.homepage);

module.exports = router; 