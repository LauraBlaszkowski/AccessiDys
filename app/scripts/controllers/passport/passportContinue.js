/* File: passportContinue.js
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
/**
 * Controller responsible for all the operations
 * having something to do with the bookmarklet
 */


/* global $:false */
angular.module('cnedApp').controller('passportContinueCtrl', function($scope, $http, $rootScope, $location, serviceCheck, dropbox, configuration) {

    $scope.guest = $rootScope.loged;
    $scope.missingDropbox = $rootScope.dropboxWarning;

    $scope.toStep3Button = false;
    $scope.inscriptionStep2 = false; // false
    $scope.inscriptionStep3 = false; // false
    $scope.inscriptionStep4 = false; // false
    $scope.showStep2part1 = true; // true
    $scope.showStep2part2 = false; // false
    $scope.steps = 'step_two';
    $rootScope.$watch('loged', function() {
        $scope.guest = $rootScope.loged;
        $scope.apply; // jshint ignore:line
    });

    $scope.init = function() {
        $scope.inscriptionStep1 = false;
        $scope.inscriptionStep2 = true;
        $scope.inscriptionStep3 = false;
        $scope.showStep2part2 = false;
        var tmp = serviceCheck.getData();
        tmp.then(function(result) { // this is only run after $http completes
            if (result.loged) {
                console.log(result);
                if (result.dropboxWarning === false) {
                    $scope.stepsTitle = 'COMPTE DROPBOX';
                    $scope.stepsSubTitle = 'Association avec Votre compte DropBox';
                    $rootScope.dropboxWarning = false;
                    $scope.missingDropbox = false;
                    $rootScope.loged = true;
                    $rootScope.admin = result.admin;
                    UtilsService.showInformationModal('Informations',
                        'Votre compte Accessidys a bien été créé. Vous pouvez désormais l\'utiliser pour accéder à l\'application Accessidys. Cependant vous ne pourrez le faire qu\'après avoir associé ce compte à votre compte DropBox. Nous vous proposons d’en créer un si nécessaire dans l\'étape suivante.', null, true);
                    $rootScope.apply; // jshint ignore:line
                    if ($location.path() !== '/inscriptionContinue') {
                        $location.path('/inscriptionContinue');
                    }
                } else {
                    $scope.stepsTitle = 'CONFIRMATION DROPBOX';
                    $scope.stepsSubTitle = 'Association avec Votre compte DropBox';
                    $rootScope.dropboxWarning = true;
                    $rootScope.loged = true;
                    $rootScope.currentUser = result.user;
                    $rootScope.admin = result.admin;
                    $scope.showStep2part1 = false; // true
                    $scope.showStep2part2 = true; // false
                    $rootScope.apply; // jshint ignore:line

                    $rootScope.listDocumentDropBox = '#/listDocument';
                    $scope.userDropBoxLink = '\'' + configuration.URL_REQUEST + '/#/apercu?url=\'+encodeURIComponent(document.URL).replace(/%3A/g,":")';
                    $scope.toStep3Button = true;
                    $rootScope.apply; // jshint ignore:line
                }
            }
        });
    };

    $scope.toStep3 = function() {
        $scope.stepsTitle = 'AJOUT DU BOUTTON Accessidys';
        $scope.stepsSubTitle = 'Ajouter le boutton Accessidys à votre barre de favoris';
        $scope.steps = 'step_three';
        $scope.showlogin = false;
        $scope.inscriptionStep1 = false;
        $scope.inscriptionStep2 = false;
        $scope.inscriptionStep3 = true;
    };

    $scope.toStep4 = function() {
        $scope.stepsTitle = 'CONFIGURATION DE PROFIL(S) D\'ADAPTATION';
        $scope.stepsSubTitle = 'Configurer le(s) profil(s) d\'adaptation de document dont vous avez besoin';
        $scope.steps = 'step_four';
        $scope.showlogin = false;
        $scope.inscriptionStep1 = false;
        $scope.inscriptionStep2 = false;
        $scope.inscriptionStep3 = false;
        $scope.inscriptionStep4 = true;
        if (localStorage.getItem('compteId')) {
            $scope.profileDropbox = $rootScope.listDocumentDropBox.replace('listDocument', 'profiles') + '?key=' + localStorage.getItem('compteId');
        } else {
            $scope.profileDropbox = $rootScope.listDocumentDropBox.replace('listDocument', 'profiles');
        }
        var token = {
            id : $rootScope.currentUser.local.token
        };
        $http.post(configuration.URL_REQUEST + '/chercherProfilsParDefaut', token).success(function(data) {
            if (data.length) {
                $scope.profilDefautFlag = data;
                $scope.profilUser = {
                    profilID : data[0].profilID,
                    userID : $rootScope.currentUser._id
                };
                token.newActualProfile = $scope.profilUser;
                /* jshint ignore:start */
                $http.post(configuration.URL_REQUEST + '/ajouterUserProfil', token).success(function(data) {
                    $http.post(configuration.URL_REQUEST + '/chercherProfil', {
                        id : token.id,
                        searchedProfile : $scope.profilDefautFlag[0].profilID
                    }).success(function(data) {
                        $http.post(configuration.URL_REQUEST + '/chercherTagsParProfil', {
                            idProfil : $scope.profilDefautFlag[0].profilID
                        }).success(function(data) {
                            $scope.listTagsByProfil = data;
                            localStorage.setItem('listTagsByProfil', JSON.stringify($scope.listTagsByProfil));
                        });

                    });
                });
                /* jshint ignore:end */

            }

        });

    };

});
