let express = require('express'); 
let router = express.Router(); 

//***********************MVC routes***********************//

let homepageController = require('./controllers/homepageController.js');
let profilesController = require('./controllers/profilesController.js');


//***********************routes for the main pages***********************//
router.get('/', function (request, response) {
    response.redirect ('/homepage');
});
//route for the homepage
router.get('/homepage', homepageController.homepage);
//route for the creation profile page 
router.get('/createProfile', profilesController.createProfile);


//***********************MVC profiles actions***********************//
//create a profile (add one)
router.post('/createProfile', profilesController.addProfile);
//route to display profiles on profilesFeed
router.get('/profilesFeed', profilesController.feed);
//route to identify in order to sign in a user 
router.get('/signIn', function (request, response) {
    response.render ('connection.ejs');
});
//route to sign in a user 
router.post('/profile', profilesController.signIn);
//route to update your profile
router.get('/profile/updateProfile/:profileid', profilesController.getUpdateProfile);
router.post('/profile/updateProfile', profilesController.updateProfile);
//route to delete your own profile
router.get('/profile/deleteProfile/:id', profilesController.deleteProfile); 


//***********************MVC songs actions***********************//
//add a Song
router.post('/addSong', profilesController.addSong);
//delete a Song
router.get('/profile/deleteSong/:id', profilesController.deleteSong);





module.exports = router; 