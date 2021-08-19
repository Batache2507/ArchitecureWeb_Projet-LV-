let express = require('express'); 
let router = express.Router(); 

/****************************************************************************/
/******************************MVC ROUTES************************************/
/****************************************************************************/

let homepageController = require('./controllers/homepageController.js');
let profilesController = require('./controllers/profilesController.js');
let profilesControllerAPI = require('./controllers/profilesControllerAPI');


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


/****************************************************************************/
/******************************API ROUTES************************************/
/****************************************************************************/

//display all profiles and all songs created
router.get('/api/profilesFeed', profilesControllerAPI.feed);
//display all the profiles (only)
router.get('/api/profilesFeed', profilesControllerAPI.profilesOnlyFeed);
//display one profile
router.get('/api/profile/:id', profilesControllerAPI.listOneProfile);
//add a profile
router.post('/api/createProfile', profilesControllerAPI.addProfile);
//delete a profile 
router.delete('/api/profile/deleteProfile/:id', profilesControllerAPI.deleteProfile); 
//update a profile
router.put('/api/profile', profilesControllerAPI.updateProfile);

//display all songs 
//display one song 
router.get('/api/profile/listOneSong/:id', profilesControllerAPI.listOneSong);
//add a song 
router.post('/api/addSong', profilesControllerAPI.addSong);
//delete a song 
router.delete('/api/profile/deleteSong/:id', profilesControllerAPI.deleteSong);
//update a song 
router.put('/api/profile/updateSong', profilesControllerAPI.updateSong);

module.exports = router; 