let express = require('express'); 
let router = express.Router(); 

//***********************MVC routes***********************//
let homepageController = require('./controllers/homepageController.js');
//let instrumentsController = require('./controllers/instrumentsController.js');
let profilesController = require('./controllers/profilesController.js');
//let settingsController = require('./controllers/settingsController.js')
//let artistController = require('./controllers/artistController.js');


//routes for the main pages
router.get('/', function (request, response) {
    response.redirect ('/homepage');
});
//route for the homepage
router.get('/homepage', homepageController.homepage);
//route for the profile page 
//router.get('/createProfile', profilesController.createProfile);



//MVC profiles actions
//add a profile
//router.post('/createProfile/add/', profilesController.addProfile);
// Supprime un élément de la liste des joueurs
//router.get('/createProfile/delete/:id', profilesController.deleteProfile);
// Modifier un élément de la liste joueurs 
//router.get('/createProfile/update/:id', profilesController.updateProfile);




module.exports = router; 