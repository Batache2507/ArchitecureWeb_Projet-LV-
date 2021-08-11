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
    let data;
    connection.query("SELECT * FROM users WHERE nickname = ?;", request.body.nickname, function (error, resultSQL) {
        if (error) {
            //console.log(error);
            return;
        } else {
            data = resultSQL
        }
    });
    console.log(data)
    console.log("WTF")
    signInSuite(response, data)
    return;
}

function signInSuite(response, result){
    connection.query("SELECT * FROM `songs` WHERE `songs`.`user_id` = 1;"), function (error, resultSQL) {
        if (error) {
            
            return;
            //console.log(error);
        }
        else {
            response.render('profile.ejs', { user: result, songs: resultSQL });
        }
    }
}



//add a profile to the list 
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

//delete a profile from the list 
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
    connection.query("INSERT INTO songs SET ?",song, (error, resultSQL) => {
        if (error) {
            response.status(400).send(error);
        } else {
            response.redirect('/homepage');

        }
    });
};
