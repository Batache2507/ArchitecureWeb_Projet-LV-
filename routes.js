let express = require('express'); 
let router = express.Router(); 

//***********************MVC routes***********************//
let homepageController = require('./controllers/homepageController.js');
//let instrumentsController = require('./controllers/instrumentsController.js');
let profilesController = require('./controllers/profilesController.js');



//***********************routes for the main pages***********************//
router.get('/', function (request, response) {
    response.redirect ('/homepage');
});
//route for the homepage
router.get('/homepage', homepageController.homepage);
//route for the cteation profile page 
router.get('/createProfile', profilesController.createProfile);


//***********************MVC profiles actions***********************//
//add a profile
router.post('/createProfile', profilesController.addProfile);
//route to display profiles on profilesFeed
router.get('/profilesFeed', profilesController.feed);
//route to identify in order to sign in a user 
router.get('/signIn', function (request, response) {
    response.render ('connection.ejs');
});
//route to sign in a user 
router.post('/profile', profilesController.signIn);


//***********************MVC songs actions***********************//
//add a Song
router.post('/addSong', profilesController.addSong);

// Supprime un élément de la liste des joueurs
//router.get('/createProfile/delete/:id', profilesController.deleteProfile);
// Modifier un élément de la liste joueurs 
//router.get('/createProfile/update/:id', profilesController.updateProfile);




module.exports = router; 