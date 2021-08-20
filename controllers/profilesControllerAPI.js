let connection = require('../db.js');

let User = require('../models/userModel.js');
let Song = require('../models/songModel.js');


/************************PROFILES ACTIONS************************************/

//display all the profiles AND all the songs
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


//display all the profiles (only)
exports.profilesOnlyFeed = function (request, response) {
    connection.query('SELECT * FROM users', function (error, resultSQL) {
        if (error) {
            response.status(400).json({ "message": error});
        } else {
            response.status(200).json({users: resultSQL});
        }
    });
};
   

//display ONE profile 
exports.listOneProfile = function (request, response) {
    connection.query('SELECT * FROM users WHERE id =  ?', request.params.id, function (error, resultSQL){
        if (error) {
            response.status(400).json({ "message": 'error' });
        }
        else {
            response.status(200);
            users = resultSQL;  
            response.json(resultSQL);
        }
    });
}

//add a profile
exports.addProfile = function (request, response) {
    let profile = new User(request.body.id, request.body.firstname, request.body.lastname, request.body.nickname, request.body.country, request.body.musical_genre, request.body.instrument);
    connection.query("INSERT INTO users SET ?", profile, function (error, resultSQL) {
        if (error) {
            response.status(400).json({ "message": 'error' });
        } else {
            response.status(200).json({ "message": 'success' });
        }
    });
};

//delete a profile
exports.deleteProfile = function (request, response) {
    connection.query("DELETE FROM users WHERE users.id = ?", request.params.id, function (error, resultSQL)  {
        if (error) {
            response.status(400).json({ "message": 'error '});
        } else {
            response.status(200).json({ "message": 'success' });
        }
    });
};

//update a profile
exports.updateProfile = function (request, response) {
    let id = request.body.id;
    let profile = new User(id, request.body.firstname, request.body.lastname, request.body.nickname, request.body.country, request.body.musical_genre, request.body.instrument);
    connection.query("UPDATE users SET ? WHERE users.id = ?", [profile, parseInt(id, 10)], function (error, resultSQLupdateProfile) {
        if (error) {
            response.status(400).json({ "message": 'error '});
        } else {
            response.status(200).json({ "message": 'success' });
        }
    });
}


/************************SONGS ACTIONS************************************/
//display all the songs (only)
exports.songsOnlyFeed = function (request, response) {
    connection.query('SELECT * FROM songs', function (error, resultSQL) {
        if (error) {
            response.status(400).json({ "message": error});
        } else {
            response.status(200).json({songs: resultSQL});
        }
    });
};

//display ONE song
exports.listOneSong = function (request, response) {
    connection.query('SELECT * FROM songs WHERE id =  ?', request.params.id, function (error, resultSQL){
        if (error) {
            response.status(400).json({ "message": 'error' });
        }
        else {
            response.status(200);
            users = resultSQL;  
            response.json(resultSQL);
        }
    });
}

//add a song 
exports.addSong = function (request, response) {
    let song = new Song(request.body.id, request.body.title, request.body.duration, request.body.musical_genre, request.body.user_id)
    connection.query("INSERT INTO songs SET ?", song, function (error, resultSQLNewSong)  {
        if (error) {
            response.status(400).json({ "message": 'error '});
        } else {
            response.status(200).json({ "message": 'success' });
        }
    });
};


//delete a song
exports.deleteSong = function (request, response) {
    connection.query("DELETE FROM songs WHERE songs.id = ?", request.params.id, function (error, resultSQL)  {
        if (error) {
            response.status(400).json({ "message": 'error '});
        } else {
            response.status(200).json({ "message": 'success' });
        }
    });
};

//update a song
exports.updateSong = function (request, response) {
    let id = request.body.id;
    let song = new Song(id, request.body.title, request.body.duration, request.body.musical_genre, request.body.user_id);
    connection.query("UPDATE songs SET ? WHERE songs.id = ?", [song, parseInt(id, 10)], function (error, resultSQLupdateProfile) {
        if (error) {
            response.status(400).json({ "message": 'error '});
        } else {
            response.status(200).json({ "message": 'success' });
        }
    });
}




