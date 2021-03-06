/* File: profils.js
 *
 * Copyright (c) 2013-2016
 * Centre National d’Enseignement à Distance (Cned), Boulevard Nicephore Niepce, 86360 CHASSENEUIL-DU-POITOU, France
 * (direction-innovation@cned.fr)
 *
 * GNU Affero General Public License (AGPL) version 3.0 or later version
 *
 * This file is part of a program which is free software: you can
 * redistribute it and/or modify it under the terms of the
 * GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public
 * License along with this program.
 * If not, see <http://www.gnu.org/licenses/>.
 *
 */


'use strict';
/* jshint unused: false, undef:false */


/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Profil = mongoose.model('Profil'),
    UserProfil = mongoose.model('UserProfil'),
    ProfilTag = mongoose.model('ProfilTag');

var fs = require('fs');
var helpers = require('../helpers/helpers.js');
var async = require('async');


/**
 * Add a profile to a user with attributes:
 * Profile Id,user ID,favourites,current,default
 */
exports.createProfile = function (req, res) {
    var profile = new Profil(req.body.newProfile);

    var bitmap = fs.readFileSync(profile.photo);
    profile.photo = new Buffer(bitmap).toString('base64');
    profile.owner = req.body.newProfile.owner;

    profile.save(function (err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                profile: profile
            });
        } else {
            helpers.journalisation(1, req.user, req._parsedUrl.pathname, 'profile ID : [' + profile._id + '] Profile Name: [' + profile.nom + ']');
            var userProfil = new UserProfil({
                'profilID': profile._id,
                'userID': profile.owner,
                'favoris': false,
                'actuel': false,
                'default': false
            });
            userProfil.save(function (err) {
                if (err) {
                    res.send({
                        'result': 'error'
                    });
                } else {
                    res.jsonp(200, profile);
                }
            });
        }
    });
};


/**
 * List all profiles by user
 */
exports.allByUser = function (req, res) {
    Profil.find({
        'owner': req.user._id
    }).exec(function (err, profils) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            helpers.journalisation(1, req.user, req._parsedUrl.pathname, 'array profile sended');
            res.send(profils);
        }
    });
};

/**
 * List all current profiles by user
 */
exports.profilActuByToken = function (req, res) {
    UserProfil.findOne({
        userID: req.user._id,
        actuel: true
    }, function (err, item) {
        if (err) {
            console.log(err);
            res.send({
                'result': 'error'
            });
        } else {
            if (item) {
                Profil.findById(item.profilID, function (err, profileActu) {
                    if (err) {
                        res.send({
                            'result': 'error'
                        });
                    } else {
                        helpers.journalisation(1, req.user, req._parsedUrl.pathname, 'ID-Profile :[' + profileActu._id + ']' + 'Profile-Name :[' + profileActu.nom + ']');
                        res.send(profileActu);
                    }
                });
            } else {
                UserProfil.findOne({
                    delegatedID: req.user._id,
                    actuelDelegate: true
                }, function (err, item) {
                    if (err || !item) {
                        console.log(err);
                        res.send({
                            'result': 'error'
                        });
                    } else {
                        Profil.findById(item.profilID, function (err, profileActu) {
                            if (err) {
                                res.send({
                                    'result': 'error'
                                });
                            } else {
                                helpers.journalisation(1, req.user, req._parsedUrl.pathname, 'ID-Profile :[' + profileActu._id + ']' + 'Profile-Name :[' + profileActu.nom + ']');
                                res.send(profileActu);
                            }
                        });
                    }
                });
            }
        }
    });


};

/**
 * Update Profiles by profile Id
 */
exports.update = function (req, res) {
    var profil = new Profil(req.body.updateProfile);

    Profil.findById(profil._id, function (err, item) {
        if (err) {
            res.send({
                'result': 'error'
            });
        } else {
            item.photo = profil.photo;
            item.nom = profil.nom;
            item.descriptif = profil.descriptif;
            item.save(function (err) {
                if (err) {
                    res.send({
                        'result': 'error'
                    });
                } else {
                    helpers.journalisation(1, req.user, req._parsedUrl.pathname, 'profileModified ID : [' + item._id + '] Profile Name: [' + item.nom + ']');
                    res.send(200, item);
                }
            });
        }
    });
};


/**
 * Delete a profile
 */
exports.supprimer = function (req, res) {
    Profil.findByIdAndUpdate(req.body.removeProfile.profilID, {
        owner: ''
    }, function (err, item) {
        if (err) {
            res.send({
                'result': 'error'
            });
        } else {
            helpers.journalisation(1, req.user, req._parsedUrl.pathname, 'ID-Profile :[' + item._id + ']' + 'Profile-Name :[' + item.nom + ']');
            UserProfil.findOneAndRemove({
                profilID: req.body.removeProfile.profilID,
                userID: req.body.removeProfile.userID
            }, function (err, item) {
                if (err) {
                    res.send({
                        'result': 'error'
                    });
                } else {
                    helpers.journalisation(1, req.user, req._parsedUrl.pathname, 'profilID :[' + item.profilID + ']');
                    res.jsonp(200);
                }
            });
        }
    });
};

/**
 * Search a profile
 */
exports.chercherProfil = function (req, res) {
    Profil.findById(req.body.searchedProfile, function (err, item) {
        if (err) {
            res.send({
                'result': 'error'
            });
        } else {
            if (item) {
                helpers.journalisation(1, req.user, req._parsedUrl.pathname, 'ID-Profile :[' + item._id + ']' + 'Nom-Profile :[' + item.nom + ']');
                res.send(item);
            }
        }
    });
};

/**
 * Search a profile and the user associated with this profile
 */
exports.getProfilAndUserProfil = function (req, res) {
    Profil.findById(req.body.searchedProfile, function (err, itemProfil) {
        if (err) {
            res.send({
                'result': 'error'
            });
        } else {
            if (itemProfil) {
                helpers.journalisation(1, req.user, req._parsedUrl.pathname, 'ID-Profile :[' + itemProfil._id + ']' + 'Nom-Profile :[' + itemProfil.nom + ']' + ' User:' + req.body.id);
                UserProfil.findOne({
                    profilID: itemProfil._id,
                    userID: req.body.id
                }, function (err, itemUserProfilCurrentUser) {
                    if (err) {
                        res.send({
                            'result': 'error'
                        });
                    } else if (itemUserProfilCurrentUser) {
                        var item = {};
                        item._id = itemProfil._id;
                        item.nom = itemProfil.nom;
                        item.descriptif = itemProfil.descriptif;
                        item.owner = itemProfil.owner;
                        if (itemProfil.delegated) {
                            item.delegated = itemProfil.delegated;
                        }
                        if (itemProfil.preDelegated) {
                            item.preDelegated = itemProfil.preDelegated;
                        }
                        item.profilID = itemUserProfilCurrentUser.profilID;
                        item.userID = itemUserProfilCurrentUser.userID;
                        item.favoris = itemUserProfilCurrentUser.favoris;
                        item.actuel = itemUserProfilCurrentUser.actuel;
                        item.default = itemUserProfilCurrentUser.default;
                        if (itemUserProfilCurrentUser.delegatedID) {
                            item.delegatedID = itemUserProfilCurrentUser.delegatedID;
                        }
                        res.send(item);
                        // otherwise we search in userProfiles not related to the user
                        // donne
                    } else {
                        UserProfil.findOne({
                            profilID: itemProfil._id
                        }, function (err, itemUserProfil) {
                            if (err) {
                                res.send({
                                    'result': 'error'
                                });
                            } else {
                                var item = {};
                                item._id = itemProfil._id;
                                item.nom = itemProfil.nom;
                                item.descriptif = itemProfil.descriptif;
                                item.owner = itemProfil.owner;
                                if (itemProfil.delegated) {
                                    item.delegated = itemProfil.delegated;
                                }
                                if (itemProfil.preDelegated) {
                                    item.preDelegated = itemProfil.preDelegated;
                                }
                                item.profilID = itemUserProfil.profilID;
                                item.userID = itemUserProfil.userID;
                                item.favoris = false;
                                item.actuel = itemUserProfil.actuel;
                                item.default = itemUserProfil.default;
                                if (itemUserProfil.delegatedID) {
                                    item.delegatedID = itemUserProfil.delegatedID;
                                }
                                res.send(item);
                            }
                        });
                    }
                });
            }
        }
    });
};


/**
 * Add a default profile
 */
exports.ajoutDefaultProfil = function (req, res) {

    var profile = new Profil(req.body);

    profile.save(function (err) {

        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                profile: profile
            });
        } else {
            helpers.journalisation(1, req.user, req._parsedUrl.pathname, 'profile ID : [' + profile._id + '] Profile Name: [' + profile.nom + ']');
            // res.jsonp(profile);
            res.send(profile);
        }
    });
};


/**
 * Delegate a profile
 */
exports.delegateProfil = function (req, res) {
    Profil.findById(req.body.idProfil, function (err, item) {
        if (err) {
            res.send({
                'result': 'error'
            });
        } else {
            item.preDelegated = req.body.idDelegue;
            item.save(function (err) {
                if (err) {
                    res.send({
                        'result': 'error'
                    });
                } else {
                    res.send(200, item);
                }
            });
        }
    });
};

/**
 * Cancel the delegation of a Profile
 */
exports.annulerDelegateUserProfil = function (req, res) {
    Profil.findById(req.body.sendedVars.idProfil, function (err, item) {
        if (err) {
            res.send({
                'result': 'error'
            });
        } else {
            if (item) {
                item.preDelegated = undefined;
                item.save(function (err) {
                    if (err) {
                        res.send({
                            'result': 'error'
                        });
                    } else {
                        helpers.journalisation(1, req.user, req._parsedUrl.pathname, 'Annuler une délégation d\'un profil');
                        res.send(200, item);
                    }
                });
            } else {
                helpers.journalisation(1, req.user, req._parsedUrl.pathname, 'Annuler une délégation d\'un profil');
                res.send(200, item);
            }
        }
    });
};

/* List of profiles : Owner */
exports.listeProfils = function (req, res) {

    console.log('profil delegues' + req.user);

    var listeProfils = [];

    async.waterfall([

            function (callback) {
                callback(null, 'one');

            },
            function (arg1, callback) {
                /* User profiles */

                Profil.find({
                    'owner': req.user._id
                }).exec(function (err, profils) {
                    if (err) {
                        res.render('error', {
                            status: 500
                        });
                    } else {
                        for (var i = 0; i < profils.length; i++) {
                            var profilModified = profils[i].toObject();
                            profilModified.state = 'mine';
                            listeProfils.push(profilModified);
                        }
                        callback(null, 'one', 'two');
                    }
                });

            },
            function (arg1, arg2, callback) {
                /* Favourite profiles */

                UserProfil.find({
                    userID: req.user._id,
                    favoris: true
                }, function (err, item) {
                    if (err) {
                        res.send({
                            'result': 'error'
                        });
                    } else {
                        if (item) {

                            var stringProfilsIds = [];
                            for (var i = 0; i < item.length; i++) {
                                stringProfilsIds.push(new mongoose.Types.ObjectId(item[i].profilID));
                            }

                            if (stringProfilsIds.length > 0) {
                                Profil.find({
                                    '_id': {
                                        $in: stringProfilsIds
                                    }
                                }, function (err, profils) {

                                    if (profils) {
                                        for (var i = 0; i < profils.length; i++) {
                                            var profilModified = profils[i].toObject();
                                            profilModified.state = 'favoris';
                                            listeProfils.push(profilModified);
                                        }
                                    }

                                    callback(null, 'one', 'two', 'three');
                                });
                            } else {
                                callback(null, 'one', 'two', 'three');
                            }
                        }
                    }
                });

            },
            function (arg1, arg2, arg3, callback) {
                /* delegated Profiles. */
                UserProfil.find({
                    delegatedID: req.user._id,
                    delegate: true
                }, function (err, item) {
                    if (err) {
                        res.send({
                            'result': 'error'
                        });
                    } else {
                        if (item) {

                            var stringProfilsIds = [];
                            for (var i = 0; i < item.length; i++) {
                                stringProfilsIds.push(new mongoose.Types.ObjectId(item[i].profilID));
                            }

                            if (stringProfilsIds.length > 0) {
                                Profil.find({
                                    '_id': {
                                        $in: stringProfilsIds
                                    }
                                }, function (err, profils) {

                                    if (profils) {
                                        for (var i = 0; i < profils.length; i++) {
                                            var profilModified = profils[i].toObject();
                                            profilModified.state = 'delegated';
                                            listeProfils.push(profilModified);
                                        }
                                    }

                                    callback(null, 'one', 'two', 'three', 'four');
                                });
                            } else {
                                callback(null, 'one', 'two', 'three', 'four');
                            }
                        }
                    }
                });

            },
            function (arg1, arg2, arg3, arg4, callback) {
                /* Default profiles */

                UserProfil.find({
                    'default': true
                }, function (err, item) {
                    if (err) {
                        res.send({
                            'result': 'error'
                        });
                    } else {
                        if (item) {

                            var stringProfilsIds = [];
                            for (var i = 0; i < item.length; i++) {
                                stringProfilsIds.push(new mongoose.Types.ObjectId(item[i].profilID));
                            }

                            if (stringProfilsIds.length > 0) {

                                Profil.find({
                                    '_id': {
                                        $in: stringProfilsIds
                                    }
                                }, function (err, profils) {

                                    if (profils) {

                                        for (var i = 0; i < profils.length; i++) {
                                            var profilModified = profils[i].toObject();
                                            profilModified.state = 'default';
                                            listeProfils.push(profilModified);
                                        }
                                    }

                                    callback(null, 'one', 'two', 'three', 'four', 'five');
                                });
                            } else {
                                callback(null, 'one', 'two', 'three', 'four', 'five');
                            }
                        }
                    }
                });


            },
            function (arg1, arg2, arg3, arg4, arg5, callback) {
                /* Selections of the tags of profile */

                var stringProfilsIds = [];
                for (var i = 0; i < listeProfils.length; i++) {
                    stringProfilsIds.push(listeProfils[i]._id);
                }

                console.log('=========== > ');
                console.log('stringProfilsIds = ' + stringProfilsIds);

                ProfilTag.find({
                    profil: {
                        $in: stringProfilsIds
                    }
                }, function (err, tags) {
                    if (tags) {

                        console.log('tags =  ' + tags.length);

                        var listeProfilsTags = [];

                        for (var i = 0; i < listeProfils.length; i++) {
                            listeProfils[i].type = 'profile';
                            listeProfilsTags.push(listeProfils[i]);

                            var tagsObject = {};
                            tagsObject.type = 'tags';
                            tagsObject.idProfil = listeProfils[i]._id;
                            tagsObject.tags = [];
                            for (var j = 0; j < tags.length; j++) {
                                if (listeProfils[i]._id == tags[j].profil) { // jshint ignore:line
                                    tagsObject.tags.push(tags[j]);
                                }
                            }
                            if (tagsObject.tags) {
                                listeProfilsTags.push(tagsObject);
                            }

                        }
                        helpers.journalisation(1, req.user, req._parsedUrl.pathname, 'La liste des profils envoyée : ' + listeProfilsTags);
                        res.send(listeProfilsTags);
                    }
                });

                // res.send("error");
            }
        ],
        function (err, result) {
        });


};


/**
 * Search Profile by name
 */
exports.existingProfiles = function (req, res) {
    Profil.findOne({
        'nom': req.body.nom,
        'owner': req.body.owner,
        '_id': {
            $ne: req.body._id
        }
    }).exec(function (err, profil) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            helpers.journalisation(1, req.nom, req._parsedUrl.pathname, 'profile sended');
            res.send(profil);
        }
    });
};