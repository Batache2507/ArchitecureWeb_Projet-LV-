//let connection = require('../db.js');
//let Profile = require('../models/profilesModel.js');
//listeProfiles = [];

//add a profile to the list 
exports.addProfile = function (request, response) {
    let profile = new Profile(req.body.id, req.body.firstname, req.body.lastname);
    connection.query("INSERT INTO profiles set ?", profile, function (error, resultSQL) {
        if (error) {
            res.status(400).send(error);
        } else {
            res.status(201).redirect('/homepage');
        }
    });
};

//delete a profile from the list 
exports.deleteProfile = function (request, response) {
    connection.query("DELETE FROM 'profiles' WHERE 'profiles.'id' = ?", [req.params.id], (error, resultSQL) => {
        if (error) {
            res.status(400).send(error);
        } else {
            res.redirect('/homepage');

        }
    });
};

//update a profile from the list 
exports.updateProfile = function (request, response) {
    let profile = new Profile(req.body.id, req.body.firstname, req.body.lastname);
    connection.query("UPDATE profiles SET ? WHERE id = ?",
    
        [profile, req.body.id], function (error, resultSQL) {
            if (error) {
                res.status(400).send(error);
            } else {
                res.status(202).redirect('/homepage');
        }
    })
};