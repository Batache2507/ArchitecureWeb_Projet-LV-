let connection = require('../db.js');

let User = require('../models/userModel.js');
let Song = require('../models/songModel.js');


exports.createProfile = function (request, response) {
    response.render('createProfile.ejs');
}

exports.feed = function (request, response) {
    connection.query('SELECT * from users', function (error, resultSQL) {
        if (error) {
            response.status(400).send(error);
        } else {
            response.render('profilesFeed.ejs', { users: resultSQL });
        }
    });
}

exports.signIn = function (request, response) {
    connection.query('select * from users where nickname =  ?', request.body.nickname, function (error, resultSQL) {
        if (error) {
            response.status(400).send(error);
        } else {
            connection.query('select * from songs where songs.user_id =  ?', function (error, resultSQL) {
                if (error) {
                    response.status(400).send(error);
                }
            });
        };

    })
};

//function signInSuite(response, result) {
// console.log("WTF2")
// connection.query("SELECT * FROM songs WHERE songs.user_id = ?;", function (error, resultSQL) {
//  if (error) {
//   response.status(400).send(error);
//return;
//console.log(error);
//  }
//   else {
//       response.render('profile.ejs', { user: result, songs: resultSQL });
//   }
//  });
//}



//add a profile to the list of profiles (for the feed)
exports.addProfile = function (request, response) {
    let profile = new User(request.body.id, request.body.firstname, request.body.lastname, request.body.nickname, request.body.region, request.body.musical_genre, request.body.instrument);
    connection.query("INSERT INTO users set ?", profile, function (error, resultSQL) {
        if (error) {
            response.status(400).send(error);
        } else {
            response.status(201).redirect('/homepage'); //change page destination to 'my profile'//
        }
    });
};

//delete a profile from the list of profiles (of the feed) and his songs linked
exports.deleteProfile = function (request, response) {
    connection.query("DELETE FROM 'users' WHERE 'users.'id' = ?", [request.params.id], (error, resultSQL) => {
        if (error) {
            response.status(400).send(error);
        } else {
            response.redirect('/homepage');

        }
    });
};

//update music uploaded


//add a song to profile 
exports.addSong = function (request, response) {
    let song = new Song(request.body.id, request.body.title, request.body.duration, request.body.user_id)
    connection.query("INSERT INTO songs SET ?", song, (error, resultSQL) => {
        if (error) {
            response.status(400).send(error);
        } else {
            response.redirect('/homepage');

        }
    });
};
