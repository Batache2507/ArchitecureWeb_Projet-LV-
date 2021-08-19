let connection = require('../db.js');

let User = require('../models/userModel.js');
let Song = require('../models/songModel.js');


/************************PROFILES ACTIONS************************************/

//display all the profiles created on the website on the page 'Profile's feed' (API)
exports.feed = function (request, response) {
    connection.query('SELECT * FROM users', function (error, resultSQL) {
        if (error) {
            response.status(400).json({ "message": error});
        } else {
            connection.query('SELECT * FROM songs', function (error, resultSQL2) {
                if (error) {
                    response.status(400).json({ "message": error});
                } else {
                    response.status(200).json({users: resultSQL, songs: resultSQL2});
            }
        });
        }
    });
}

//display one profile 
exports.listOneProfile = function (request, response) {
    connection.query('SELECT * FROM users WHERE id =  ?', function (error, resultSQL){
        if (error) {
            response.status(400).json({ "message": 'error' });
        }
        else {
            response.status(200);
            users = resultSQL;  
            response.json({
                id: users.id, firstname: users.firstname, lastname: users.lastname, nickname: users.nickname, country: users.country, musical_genre: users.musical_genre, instrument: users.instrument
            });
        }
    });
}

//signIn with the nickname in order to display the 'My Profile' page of the user with his songs (API)
exports.signIn = function (request, response) {
    connection.query('SELECT * FROM users  WHERE nickname =  ?', request.body.nickname, function (error, resultSQL) {
        if (error) {
            response.status(400).json({ "message": error});
        } else {
            connection.query('SELECT * FROM songs WHERE user_id =  ?', resultSQL[0].id, function (error, resultSQL2) {
                if (error) {
                    response.status(400).json({ "message": error});
                } else {
                    response.status(200);
                    users = resultSQL;
                    songs = resultSQL2;
                    response.render('profile.ejs', { user: resultSQL[0], songs: resultSQL2 });
                }
            });
        }
    });
}

//add a profile to the list of profiles (for the feed) (API)
exports.addProfile = function (request, response) {
    let profile = new User(request.body.id, request.body.firstname, request.body.lastname, request.body.nickname, request.body.country, request.body.musical_genre, request.body.instrument);
    connection.query("INSERT INTO users SET ?", profile, function (error, resultSQL) {
        if (error) {
            console.log(error);
            response.status(400).json({ "message": 'error' });
        } else {
            response.status(200).json({ "message": 'success' });
        }
    });
};

//delete your own profile and all your music associated with it (API)
exports.deleteProfile = function (request, response) {
    connection.query("DELETE FROM users WHERE users.id = ?", request.params.id, function (error, resultSQL)  {
        if (error) {
            response.status(400).json({ "message": 'error '});
        } else {
            response.status(200).json({ "message": 'success' });
        }
    });
};

//update your own profile (API)
exports.updateProfile = function (request, response) {
    let id = request.body.id;
    let profile = new User(id, request.body.firstname, request.body.lastname, request.body.nickname, request.body.country, request.body.musical_genre, request.body.instrument);
    connection.query("UPDATE users SET ? WHERE users.id = ?", [profile, parseInt(id, 10)], function (error, resultSQLupdateProfile) {
        if (error) {
            response.status(400).send(error);
        } else {
            response.status(200);
            users = profile;
            response.render('updateProfile.ejs', {
               id: users.id, firstname: users.firstname, lastname: users.lastname, nickname: users.nickname, country: users.country, musical_genre: users.musical_genre, instrument: users.instrument 
            });
        }
    });
}


exports.getUpdateProfile = function (request, response) {
    let id = request.params.profileid;
    connection.query("SELECT * FROM users WHERE users.id = ?", [parseInt(id, 10)], function (error, resultSQLupdateProfile) {
        if (error) {
            response.status(400).send(error);
        } else {
            response.status(200);
            users = resultSQLupdateProfile[0];
            console.log(users);
            response.render('updateProfile.ejs', {
               id: users.id, firstname: users.firstname, lastname: users.lastname, nickname: users.nickname, country: users.country, musical_genre: users.musical_genre, instrument: users.instrument 
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

exports.deleteSong = function (request, response) {
    connection.query("DELETE FROM songs WHERE songs.id = ?", request.params.id, function (error, resultSQL)  {
        if (error) {
            response.status(400).send(error);
        } else {
            response.redirect('/homepage');

        }
    });
};




