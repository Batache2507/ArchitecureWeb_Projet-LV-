let connection = require('../db.js');

let User = require('../models/userModel.js');
let Song = require('../models/songModel.js');


/************************PROFILES ACTIONS************************************/
//redirect the user on the profile creation page when clicking on the button "Create your profile" on the homepage
exports.createProfile = function (request, response) {
    response.render('createProfile.ejs');
}

//display all the profiles created on the website on the page 'Profile's feed'
exports.feed = function (request, response) {
    connection.query('SELECT * FROM users', function (error, resultSQL) {
        if (error) {
            response.status(400).send(error);
        } else {
            response.render('profilesFeed.ejs', { users: resultSQL });
        }
    });
}

//signIn with the nickname in order to display the 'My Profile' page of the user with his songs 
exports.signIn = function (request, response) {
    connection.query('SELECT * FROM users  WHERE nickname =  ?', request.body.nickname, function (error, resultSQL) {
        if (error) {
            response.status(400).send(error);
        } else {
            connection.query('SELECT * FROM songs WHERE user_id =  ?', resultSQL[0].id, function (error, resultSQL2) {
                if (error) {
                    response.status(400).send(error);
                } else {
                    response.render('profile.ejs', { user: resultSQL[0], songs: resultSQL2 });
                }
            });
        }
    });
}

//add a profile to the list of profiles (for the feed)
exports.addProfile = function (request, response) {
    let profile = new User(request.body.id, request.body.firstname, request.body.lastname, request.body.nickname, request.body.country, request.body.musical_genre, request.body.instrument);
    connection.query("INSERT INTO users SET ?", profile, function (error, resultSQL) {
        if (error) {
            response.status(400).send(error);
        } else {
            response.status(201).redirect('/profilesFeed'); //changer page destination to 'my profile'//
        }
    });
};

//delete your own profile and all your music associated with it 
exports.deleteProfile = function (request, response) {
    connection.query("DELETE FROM users WHERE users.id = ?", [request.params.id], function (error, resultSQL)  {
        if (error) {
            response.status(400).send(error);
        } else {
            response.redirect('/homepage');

        }
    });
};

//update your own profile
exports.updateProfile = function (request, response) {
    connection.query("SELECT FROM users WHERE users.id = ?", id, function (error, resultSQLupdateProfile) {
        if (error) {
            response.status(400).send(error);
        } else {
            response.status(200);
            joueurs = resultSQLupdateProfile;
            response.render('updateProfile.ejs', {
               id: users.id, firstname: users.firstname, lastname: users.lastname, country: users.country, musical_genre: users.musical_genre, instrument: users.instrument 
            });
        }
    });
}

/************************SONGS ACTIONS************************************/
//add a song to a profile 
exports.addSong = function (request, response) {
    let song = new Song(request.body.id, request.body.title, request.body.duration, request.body.musical_genre, request.body.user_id)
    connection.query("INSERT INTO songs SET ?", song, function (error, resultSQLNewSong)  {
        if (error) {
            response.status(400).send(error);
        } else {
           response.status(201).redirect('/profilesFeed');
        }
    });
};




