/* File: profiles.js
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


/* global spyOn:false */
/* global jQuery */
/* global gapi:true */
'use strict';

describe('Controller:ProfilesCtrl', function () {
    var $scope, controller, profilsService, q, deferred, modal, modalParameters, tests, tagsService, location, sendMailPost;
    var profilExisting = false;
    tests = [{
        _id: '52d8f928548367ee2d000006',
        photo: './files/profilImage.jpg',
        descriptif: 'descriptif2',
        nom: 'prenom',
        type: 'profile',
        state: 'default'
    }, {
        _id: '52d8f876548367ee2d000004',
        photo: './files/profilImage.jpg',
        descriptif: 'descriptif',
        nom: 'prenom',
        type: 'tags',
        'tags': [{
            'tag': '52c6cde4f6f46c5a5a000004',
            'texte': '<p data-font=\'opendyslexicregular\' data-size=\'18\' data-lineheight=\'22\' data-weight=\'Gras\' data-coloration=\'Pas de coloration\'> </p>',
            'profil': '52d8f928548367ee2d000006',
            'tagName': 'Titre 2',
            'police': 'opendyslexicregular',
            'taille': '18',
            'interligne': '22',
            'styleValue': 'Gras',
            'coloration': 'Pas de coloration',
            '_id': '53ba8c270bfd0b4e7a567e98',
            '__v': 0
        }]
    }, {
        _id: '52d8f876548367ee2d001009',
        photo: './files/profilImage.jpg',
        descriptif: 'descriptif3',
        nom: 'prenom2',
        type: 'tags',
        'tags': [{
            'tag': '52c6cde4f6f46c5a5a000007',
            'texte': '<p data-font=\'opendyslexicregular\' data-size=\'18\' data-lineheight=\'22\' data-weight=\'Gras\' data-coloration=\'Pas de coloration\'> </p>',
            'profil': '52d8f928548367ee2d000006',
            'tagName': 'Titre 3',
            'police': 'opendyslexicregular',
            'taille': '18',
            'interligne': '22',
            'styleValue': 'small',
            'coloration': 'Pas de coloration',
            '_id': '53ba8c270bfd0b4e7a567e90',
            '__v': 0
        }]
    }];
    var profils = [{
        _id: '52d8f876548367ee2d000004',
        photo: './files/profilImage.jpg',
        descriptif: 'descriptif',
        nom: 'Nom',
        type: 'tags',
        state: 'mine',
        'tags': [{
            'tag': '52ea43f3791a003f09fd751a',
            'texte': '<p data-font=\'opendyslexicregular\' data-size=\'18\' data-lineheight=\'22\' data-weight=\'Gras\' data-coloration=\'Pas de coloration\'> </p>',
            'profil': '53ba8c260bfd0b4e7a567e96',
            'tagName': 'Titre 2',
            'police': 'opendyslexicregular',
            'taille': '18',
            'interligne': '22',
            'styleValue': 'Gras',
            'coloration': 'Pas de coloration',
            '_id': '53ba8c270bfd0b4e7a567e98',
            '__v': 0
        }]
    }, {
        _id: '52d8f876548367ee2d000004',
        photo: './files/profilImage.jpg',
        descriptif: 'descriptif2',
        nom: 'Nom2',
        type: 'profile',
        state: 'default',
        owner: '5329acd20c5ebdb429b2ec66'

    }, {
        _id: '52d8f876548367ee2d000004',
        photo: './files/profilImage.jpg',
        descriptif: 'descriptif2',
        nom: 'Nom2',
        type: 'profile',
        state: 'mine',
        owner: '5329acd20c5ebdb429b2ec66'

    }];

    var tags = [{
        _id: '52c6cde4f6f46c5a5a000004',
        libelle: 'Exercice'
    }, {
        _id: '52c588a861485ed41c000002',
        libelle: 'Cours'
    }, {
        _id: '52ea43f3791a003f09fd751a',
        libelle: 'Titre 2',
        niveau: 1
    }];

    var profil = {
        _id: '52d8f928548367ee2d000006',
        photo: './files/profilImage.jpg',
        descriptif: 'descriptif3',
        nom: 'Nom3',
        delegate: true,
        preDelegated: '52d8f928548367ee2d53424232'
    };

    var profilTag = {
        _id: '52d8f928548367ee2d000006',
        tag: 'tag',
        texte: 'texte',
        profil: 'profil',
        tagName: 'tagName',
        police: 'Arial',
        taille: 'eight',
        interligne: 'fourteen',
        styleValue: 'Bold'
    };

    var detailProfil = {
        profilID: '52d8f928548367ee2d000006',
        nom: 'Profil 002',
        owner: '52d34573245467ee2f12347'
    };

    var profiles = [{
        _id: "58bd55d2cfdeac0100382091",
        nom: 'test',
        type: 'profile',
        profileTags: {
            type: 'tags',
            tags: [{
                _id: "58bd55d2cfdeac0100382092",
                coloration: "Colorer les lignes RBV",
                id_tag: "58b686cfb102ed01008bb6a7",
                interligne: "1",
                police: "opendyslexicregular",
                profil: "58b7b5e0c589b701007af018",
                spaceCharSelected: 1,
                spaceSelected: 1,
                style: "<h1>Titre 1: AccessiDys facilite la lecture des documents, livres et pages web. AccessiDys vise les personnes en situation de handicap",
                styleValue: "Gras",
                tag: "58b686cfb102ed01008bb6a7",
                tagDetail: {
                    _id: "58b686cfb102ed01008bb6a7",
                    libelle: "Titre 1",
                    niveau: 1,
                    position: 1,
                    balise: "h1"
                },
                taille: "24",
                texte: "<h1>Titre 1: AccessiDys facilite la lecture des documents, livres et pages web. AccessiDys vise les personnes en situation de handicap"
            }]
        }
    }];

    var profile = {
        _id: "58bd55d2cfdeac0100382091",
        nom: 'test',
        type: 'profile',
        profileTags: {
            type: 'tags',
            tags: [{
                _id: "58bd55d2cfdeac0100382092",
                coloration: "Colorer les lignes RBV",
                id_tag: "58b686cfb102ed01008bb6a7",
                interligne: "1",
                police: "opendyslexicregular",
                profil: "58b7b5e0c589b701007af018",
                spaceCharSelected: 1,
                spaceSelected: 1,
                style: "<h1>Titre 1: AccessiDys facilite la lecture des documents, livres et pages web. AccessiDys vise les personnes en situation de handicap",
                styleValue: "Gras",
                tag: "58b686cfb102ed01008bb6a7",
                tagDetail: {
                    _id: "58b686cfb102ed01008bb6a7",
                    libelle: "Titre 1",
                    niveau: 1,
                    position: 1,
                    balise: "h1"
                },
                taille: "24",
                texte: "<h1>Titre 1: AccessiDys facilite la lecture des documents, livres et pages web. AccessiDys vise les personnes en situation de handicap"
            }]
        }
    };


    beforeEach(module('cnedApp'));

    // define the mock people service
    beforeEach(function () {
        modal = {
            open: function (Params) {
                modalParameters = Params;
                return this;
            },
            result: {
                then: function (confirmCallback, cancelCallback) {
                    //Store the callbacks for later when the user clicks on the OK or Cancel button of the dialog
                    this.confirmCallBack = confirmCallback;
                    this.cancelCallback = cancelCallback;
                }
            },
            openCall: function (item) {
                this.result.confirmCallBack(item);
            },
            cancelCall: function (item) {
                this.result.cancelCallback(item);
            }
        };


        profilsService = {
            addProfil: function () {
                deferred = q.defer();
                deferred.resolve(profil);
                return deferred.promise;
            },
            getProfilsByUser: function () {
                deferred = q.defer();
                deferred.resolve(profiles);
                return deferred.promise;
            },
            deleteProfil: function () {
                deferred = q.defer();
                deferred.resolve(profil);
                return deferred.promise;
            },
            getProfilTags: function () {
                deferred = q.defer();
                deferred.resolve(profiles);
                return deferred.promise;
            },
            updateProfil: function () {
                deferred = q.defer();
                deferred.resolve(profil);
                return deferred.promise;
            },
            updateProfilTags: function () {
                deferred = q.defer();
                deferred.resolve(tags);
                return deferred.promise;
            },
            getUserProfil: function () {
                deferred = q.defer();
                deferred.resolve(profile);
                return deferred.promise;
            },
            lookForExistingProfile: function () {
                deferred = q.defer();
                deferred.resolve(profilExisting);
                return deferred.promise;
            }
        };
        //spyOn(modal, 'open').andCallThrough();


        tagsService = {
            getTags: function () {
                deferred = q.defer();
                deferred.resolve(tags);
                return deferred.promise;
            }
        };

        location = {
            search: function () {
                return {
                    path: function () {
                        return {
                            $$absUrl: '#/'
                        };
                    },
                    idProfil: '58bd55d2cfdeac0100382091'
                };
            },
            absUrl: function () {
                return '#/index';
            }
        };


    });

    beforeEach(inject(function ($controller, $rootScope, $httpBackend, configuration, $q) {
        q = $q;
        $scope = $rootScope.$new();

        controller = $controller('ProfilesCtrl', {
            $scope: $scope,
            profilsService: profilsService,
            $modal: modal,
            tagsService: tagsService,
            $location: location
        });

        $rootScope.currentUser = {
            local: {
                prenom: 'prenom',
                token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjaGFpbmUiOiI5dW5nc3l2aSJ9.yG5kCziw7xMLa9_6fzlJpQnX6PSURyX8CGlZeDTW8Ec'
            }
        };

        // $scope.token =
        // "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjaGFpbmUiOiI5dW5nc3l2aSJ9.yG5kCziw7xMLa9_6fzlJpQnX6PSURyX8CGlZeDTW8Ec";

        configuration.DROPBOX_TYPE = 'sandbox';

        $scope.dataRecu = {
            __v: 0,
            _id: '5329acd20c5ebdb429b2ec66',
            dropbox: {
                accessToken: 'PBy0CqYP99QAAAAAAAAAATlYTo0pN03u9voi8hWiOY6raNIH-OCAtzhh2O5UNGQn',
                country: 'MA',
                display_name: 'youbi anas', // jshint ignore:line
                emails: 'anasyoubi@gmail.com',
                referral_link: 'https://db.tt/wW61wr2c', // jshint ignore:line
                uid: '264998156'
            },
            local: {
                email: 'anasyoubi@gmail.com',
                nom: 'youbi',
                password: '$2a$08$xo/zX2ZRZL8g0EnGcuTSYu8D5c58hFFVXymf.mR.UwlnCPp/zpq3S',
                prenom: 'anas',
                role: 'admin',
                restoreSecret: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjaGFpbmUiOiJ0dHdocjUyOSJ9.0gZcerw038LRGDo3p-XkbMJwUt_JoX_yk2Bgc0NU4Vs',
                secretTime: '201431340',
                token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjaGFpbmUiOiI5dW5nc3l2aSJ9.yG5kCziw7xMLa9_6fzlJpQnX6PSURyX8CGlZeDTW8Ec',
                tokenTime: 1397469765520
            },
            loged: true,
            dropboxWarning: true,
            admin: true
        };
        $scope.currentUserData = $scope.dataRecu;
        localStorage.setItem('compteId', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjaGFpbmUiOiI5dW5nc3l2aSJ9.yG5kCziw7xMLa9_6fzlJpQnX6PSURyX8CGlZeDTW8Ec');

        $scope.token = {};
        $scope.token = {
            id: localStorage.getItem('compteId')
        };
        $rootScope.testEnv = true;
        $httpBackend.whenGET(configuration.URL_REQUEST + '/listerProfil').respond(profils);

        $scope.profil = profil;
        $httpBackend.whenPOST(configuration.URL_REQUEST + '/addUserProfilFavoris').respond(profils);

        $httpBackend.whenPOST(configuration.URL_REQUEST + '/delegateProfil').respond({});
        $httpBackend.whenGET(configuration.URL_REQUEST + '/readTags').respond(tags);
        $httpBackend.whenPOST(configuration.URL_REQUEST + '/ajouterProfils').respond(profil);
        $httpBackend.whenPOST(configuration.URL_REQUEST + '/ajouterProfilTag').respond(profilTag);
        $httpBackend.whenPOST(configuration.URL_REQUEST + '/chercherTagsParProfil').respond(tags);
        $httpBackend.whenPOST(configuration.URL_REQUEST + '/profilParUser').respond(profils);
        $httpBackend.whenPOST(configuration.URL_REQUEST + '/addUserProfil').respond(profils);
        $httpBackend.whenPOST(configuration.URL_REQUEST + '/removeUserProfile').respond(profils);
        $httpBackend.whenPOST(configuration.URL_REQUEST + '/setDefaultProfile').respond(profils);
        $httpBackend.whenPOST(configuration.URL_REQUEST + '/chercherProfilDefaut').respond(profils);
        $httpBackend.whenGET(configuration.URL_REQUEST + '/profile?id=' + $scope.dataRecu.local.token).respond($scope.dataRecu);
        $httpBackend.whenPOST(configuration.URL_REQUEST + '/defaultByUserProfilId').respond(profils);
        $httpBackend.whenPOST(configuration.URL_REQUEST + '/chercherProfilsParDefaut').respond(profils);
        $httpBackend.whenPOST(configuration.URL_REQUEST + '/findUserProfilsFavoris').respond(profils);
        $httpBackend.whenPOST(configuration.URL_REQUEST + '/findUserProfilsDelegate').respond(profils);
        $httpBackend.whenPOST(configuration.URL_REQUEST + '/chercherProfil').respond(profils);
        $httpBackend.whenPOST(configuration.URL_REQUEST + '/chercherProfilActuel').respond(profil);
        $httpBackend.whenPOST(configuration.URL_REQUEST + '/findAdmin').respond(profils);
        $httpBackend.whenPOST(configuration.URL_REQUEST + '/cancelDefaultProfile').respond(profils);
        $httpBackend.whenPOST(configuration.URL_REQUEST + '/removeUserProfileFavoris').respond(profils);
        $httpBackend.whenPOST(configuration.URL_REQUEST + '/findUserById').respond($scope.dataRecu);
        sendMailPost = $httpBackend.whenPOST(configuration.URL_REQUEST + '/sendEmail').respond(true);
        $httpBackend.whenPOST(configuration.URL_REQUEST + '/findUserByEmail').respond($scope.dataRecu);
        $httpBackend.whenPOST(configuration.URL_REQUEST + '/retirerDelegateUserProfil').respond(profil);
        $httpBackend.whenPOST(/sendMail.*/).respond(true);
        $httpBackend.whenGET(configuration.URL_REQUEST + '/listerProfil?id=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjaGFpbmUiOiI5dW5nc3l2aSJ9.yG5kCziw7xMLa9_6fzlJpQnX6PSURyX8CGlZeDTW8Ec').respond(profiles);
        $httpBackend.whenGET(configuration.URL_REQUEST + '/listerProfil?defaultProfileGetter=%7B%22profilID%22:%5B%7B%22_id%22:%2252d8f876548367ee2d000004%22,%22photo%22:%22.%2Ffiles%2FprofilImage.jpg%22,%22descriptif%22:%22descriptif%22,%22nom%22:%22Nom%22%7D,%7B%22_id%22:%2252d8f928548367ee2d000006%22,%22photo%22:%22.%2Ffiles%2FprofilImage.jpg%22,%22descriptif%22:%22descriptif2%22,%22nom%22:%22Nom2%22%7D%5D,%22userID%22:%225329acd20c5ebdb429b2ec66%22%7D&id=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjaGFpbmUiOiI5dW5nc3l2aSJ9.yG5kCziw7xMLa9_6fzlJpQnX6PSURyX8CGlZeDTW8Ec').respond(profils);
        $httpBackend.whenGET(configuration.URL_REQUEST + '/readTags?id=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjaGFpbmUiOiI5dW5nc3l2aSJ9.yG5kCziw7xMLa9_6fzlJpQnX6PSURyX8CGlZeDTW8Ec').respond(profils);
        $httpBackend.whenGET(configuration.URL_REQUEST + '/listerProfil?0=e&1=y&10=J&100=l&101=Z&102=e&103=D&104=T&105=W&106=8&107=E&108=c&11=K&12=V&13=1&14=Q&15=i&16=L&17=C&18=J&19=h&2=J&20=b&21=G&22=c&23=i&24=O&25=i&26=J&27=I&28=U&29=z&3=0&30=I&31=1&32=N&33=i&34=J&35=9&36=.&37=e&38=y&39=J&4=e&40=j&41=a&42=G&43=F&44=p&45=b&46=m&47=U&48=i&49=O&5=X&50=i&51=I&52=5&53=d&54=W&55=5&56=n&57=c&58=3&59=l&6=A&60=2&61=a&62=S&63=J&64=9&65=.&66=y&67=G&68=5&69=k&7=i&70=C&71=z&72=i&73=w&74=7&75=x&76=M&77=L&78=a&79=9&8=O&80=_&81=6&82=f&83=z&84=l&85=J&86=p&87=Q&88=n&89=X&9=i&90=6&91=P&92=S&93=U&94=R&95=y&96=X&97=8&98=C&99=G').respond(profils);
        $httpBackend.whenGET(configuration.URL_REQUEST + '/listeProfils?id=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjaGFpbmUiOiI5dW5nc3l2aSJ9.yG5kCziw7xMLa9_6fzlJpQnX6PSURyX8CGlZeDTW8Ec').respond(profiles);
        $httpBackend.whenGET(configuration.URL_REQUEST + '/listeProfils').respond(profiles);
        $httpBackend.whenGET(configuration.URL_REQUEST + '/listeProfils?id=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjaGFpbmUiOiI5dW5nc3l2aSJ9.yG5kCziw7xMLa9_6fzlJpQnX6PSURyX8CGlZeDTW8Ec&newProfile=%7B%22_id%22:%2252d8f928548367ee2d000006%22,%22photo%22:%22.%2Ffiles%2FprofilImage%2FprofilImage.jpg%22,%22descriptif%22:%22descriptif3%22,%22nom%22:%22Nom3%22,%22delegate%22:true,%22preDelegated%22:%2252d8f928548367ee2d53424232%22,%22owner%22:%225329acd20c5ebdb429b2ec66%22%7D').respond(profils);
        $httpBackend.whenGET(configuration.URL_REQUEST + '/listeProfils?id=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjaGFpbmUiOiI5dW5nc3l2aSJ9.yG5kCziw7xMLa9_6fzlJpQnX6PSURyX8CGlZeDTW8Ec&newProfile=%7B%22photo%22:%22.%2Ffiles%2FprofilImage%2FprofilImage.jpg%22,%22owner%22:%225329acd20c5ebdb429b2ec66%22,%22nom%22:%22nom1%22,%22descriptif%22:%22descriptif1%22%7D').respond(profils);
        $httpBackend.whenGET(configuration.URL_REQUEST + '/listeProfils?id=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjaGFpbmUiOiI5dW5nc3l2aSJ9.yG5kCziw7xMLa9_6fzlJpQnX6PSURyX8CGlZeDTW8Ec&updateProfile=%7B%22nom%22:%22nom%22,%22descriptif%22:%22descriptif%22%7D').respond(profils);
        $httpBackend.whenGET(configuration.URL_REQUEST + '/listeProfils?id=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjaGFpbmUiOiI5dW5nc3l2aSJ9.yG5kCziw7xMLa9_6fzlJpQnX6PSURyX8CGlZeDTW8Ec&removeProfile=%7B%22profilID%22:%2252d8f928548367ee2d000006%22,%22userID%22:%225329acd20c5ebdb429b2ec66%22%7D&toDelete=%7B%22_id%22:%2252d8f928548367ee2d000006%22,%22photo%22:%22.%2Ffiles%2FprofilImage%2FprofilImage.jpg%22,%22descriptif%22:%22descriptif3%22,%22nom%22:%22Nom3%22,%22delegate%22:true,%22preDelegated%22:%2252d8f928548367ee2d53424232%22,%22owner%22:%225329acd20c5ebdb429b2ec66%22%7D').respond(profils);
        $httpBackend.whenGET(configuration.URL_REQUEST + '/listeProfils?id=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjaGFpbmUiOiI5dW5nc3l2aSJ9.yG5kCziw7xMLa9_6fzlJpQnX6PSURyX8CGlZeDTW8Ec&removeProfile=%7B%22profilID%22:%2252d8f928548367ee2d000006%22,%22userID%22:%225329acd20c5ebdb429b2ec66%22%7D').respond(profils);
        $httpBackend.whenGET(configuration.URL_REQUEST + '/listeProfils?id=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjaGFpbmUiOiI5dW5nc3l2aSJ9.yG5kCziw7xMLa9_6fzlJpQnX6PSURyX8CGlZeDTW8Ec&newProfile=%7B%22photo%22:%22.%2Ffiles%2FprofilImage%2FprofilImage.jpg%22,%22nom%22:%22nom1%22,%22descriptif%22:%22descriptif1%22%7D').respond(profils);
        $httpBackend.whenGET(configuration.URL_REQUEST + '/listeProfils?id=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjaGFpbmUiOiI5dW5nc3l2aSJ9.yG5kCziw7xMLa9_6fzlJpQnX6PSURyX8CGlZeDTW8Ec&updateProfile=%7B%22_id%22:%2252d8f928548367ee2d000006%22,%22photo%22:%22.%2Ffiles%2FprofilImage%2FprofilImage.jpg%22,%22descriptif%22:%22descriptif3%22,%22nom%22:%22Nom3%22,%22delegate%22:true,%22preDelegated%22:%2252d8f928548367ee2d53424232%22,%22owner%22:%225329acd20c5ebdb429b2ec66%22%7D').respond(profils);

        // $httpBackend.whenGET(configuration.URL_REQUEST +
        // '/listeProfils?0=e&1=y&10=J&100=l&101=Z&102=e&103=D&104=T&105=W&106=8&107=E&108=c&11=K&12=V&13=1&14=Q&15=i&16=L&17=C&18=J&19=h&2=J&20=b&21=G&22=c&23=i&24=O&25=i&26=J&27=I&28=U&29=z&3=0&30=I&31=1&32=N&33=i&34=J&35=9&36=.&37=e&38=y&39=J&4=e&40=j&41=a&42=G&43=F&44=p&45=b&46=m&47=U&48=i&49=O&5=X&50=i&51=I&52=5&53=d&54=W&55=5&56=n&57=c&58=3&59=l&6=A&60=2&61=a&62=S&63=J&64=9&65=.&66=y&67=G&68=5&69=k&7=i&70=C&71=z&72=i&73=w&74=7&75=x&76=M&77=L&78=a&79=9&8=O&80=_&81=6&82=f&83=z&84=l&85=J&86=p&87=Q&88=n&89=X&9=i&90=6&91=P&92=S&93=U&94=R&95=y&96=X&97=8&98=C&99=G').respond(profils);
        $httpBackend.whenPOST(configuration.URL_REQUEST + '/annulerDelegateUserProfil').respond({});
        $httpBackend.whenPOST(configuration.URL_REQUEST + '/getProfilAndUserProfil').respond(detailProfil);
        $httpBackend.whenPOST(configuration.URL_REQUEST + '/findUserProfilFavoris').respond('true');
        $httpBackend.whenPOST(configuration.URL_REQUEST + '/delegateUserProfil').respond(profils);

        $scope.tests = [{
            _id: '52d8f876548367ee2d000004',
            photo: './files/profilImage.jpg',
            descriptif: 'descriptif',
            nom: 'Nom'
        }, {
            _id: '52d8f928548367ee2d000006',
            photo: './files/profilImage.jpg',
            descriptif: 'descriptif2',
            nom: 'Nom 2'
        }, {
            _id: '52d8f928548367ee2d000007',
            photo: './files/profilImage.jpg',
            descriptif: 'descriptif3',
            nom: 'Nom 3',
            type: 'profile'
        }];

        $scope.editTag = [{
            _id: '52c6cde4f6f46c5a5a000004',
            libelle: 'Exercice',
            disabled: true
        }, {
            _id: '52c6cde4f6f46c5a5a000006',
            libelle: 'Exercice',
            disabled: false
        }];
        $scope.tagStyles = [{
            tag: '52c6cde4f6f46c5a5a000004',
            interligne: 'ten',
            label: 'titre',
            police: 'Arial',
            style: '',
            styleValue: 'Bold',
            taille: 'twelve',
            state: 'added'

        }, {
            tag: '52c6cde4f6f46c5a5a000008',
            interligne: 'ten',
            label: 'titre',
            police: 'Arial',
            style: '',
            styleValue: 'Bold',
            taille: 'twelve',
            state: 'modified'
        }];

        $scope.listTags = [{
            _id: '52c6cde4f6f46c5a5a000004',
            libelle: 'Exercice',
            disabled: 'deleted',
            niveau: 1
        }, {
            _id: '52c6cde4f6f46c5a5a000006',
            libelle: 'Exercice',
            disabled: false
        }];
        localStorage.setItem('listTags', JSON.stringify($scope.listTags));
        $scope.tagList = [{
            _id: '52c6cde4f6f46c5a5a000004',
            libelle: 'Exercice',
            disabled: true
        }, {
            _id: '52c6cde4f6f46c5a5a000006',
            libelle: 'Exercice',
        }];

        $scope.tagListTest = $scope.tagList;

        $scope.currentTagEdit = {
            'libelle': 'Exercice',
            '_id': '52e8c721c32a9a0d1b885b0f',
            '__v': 0
        };
        $scope.currentTag = $scope.tagList;
        $scope.currentTagProfil = {};

        $scope.parameter = {
            tag: '52c6cde4f6f46c5a5a000004',
            interligne: 'ten',
            label: 'titre',
            police: 'Arial',
            style: '',
            styleValue: 'Bold',
            taille: 'twelve'
        };

        $scope.profMod = {
            _id: '52c6cde4f6f46c5a5a000004'
        };

    }));

    afterEach(inject(function ($controller, $rootScope) {
        $rootScope.$apply();
    }));

    it('ProfilesCtrl:delegationInfoDeconnecte', function () {
        $scope.delegationInfoDeconnecte();
        //expect(modal.open).toHaveBeenCalled();
        //expect(modalParameters.templateUrl).toEqual('views/common/informationModal.html');
    });

    it('ProfilesCtrl:partageInfoDeconnecte', function () {
        $scope.partageInfoDeconnecte();
        //expect(modal.open).toHaveBeenCalled();
        //expect(modalParameters.templateUrl).toEqual('views/common/informationModal.html');
    });


    it('ProfilesCtrl:isDelegated()', inject(function () {
        var param = {
            state: 'delegated'
        };
        expect($scope.isDelegated).toBeDefined();
        $scope.isDelegated(param);
    }));

    it('ProfilesCtrl:isFavourite()', inject(function () {
        var param = {
            state: 'favoris'
        };
        expect($scope.isFavourite).toBeDefined();
        $scope.isFavourite(param);
    }));

    it('ProfilesCtrl:isProfil()', inject(function () {
        var param = {
            showed: 'delegated',
            type: 'profile'
        };
        expect($scope.isProfil).toBeDefined();
        $scope.isProfil(param);
    }));

    it('ProfilesCtrl:isOwnerDelagate()', inject(function () {
        var param = {
            delegated: 'delegated',
            owner: '123456'
        };
        $scope.currentUserData = {
            _id: '123456'
        };
        expect($scope.isOwnerDelagate).toBeDefined();
        $scope.isOwnerDelagate(param);
    }));

    it('ProfilesCtrl:isAnnuleDelagate()', inject(function () {
        var param = {
            preDelegated: 'delegated',
            owner: '123456'
        };
        $scope.currentUserData = {
            _id: '123456'
        };
        expect($scope.isAnnuleDelagate).toBeDefined();
        $scope.isAnnuleDelagate(param);
    }));

    it('ProfilesCtrl:isDelegatedOption()', inject(function () {
        var param = {
            delegated: false,
            preDelegated: false,
            owner: '123456'
        };
        $scope.currentUserData = {
            _id: '123456'
        };
        expect($scope.isDelegatedOption).toBeDefined();
        $scope.isDelegatedOption(param);
    }));

    it('ProfilesCtrl:isDeletableIHM()', inject(function () {
        var param = {
            delegated: false,
            preDelegated: false,
            owner: '123456'
        };
        $scope.currentUserData = {
            _id: '123456'
        };
        expect($scope.isDeletableIHM).toBeDefined();
        $scope.isDeletableIHM(param);
    }));


    it('ProfilesCtrl:supprimerProfil()', inject(function ($rootScope, $httpBackend) {
        expect($scope.preSupprimerProfil).toBeDefined();
        expect($scope.supprimerProfil).toBeDefined();

        $scope.sup = {
            nom: 'name'
        };
        spyOn(jQuery.fn, 'text').andReturn('name');

        //$scope.preSupprimerProfil(profil);
        $scope.supprimerProfil();
        $httpBackend.flush();
        $rootScope.$apply();

        expect($scope.profilFlag).toEqual(profil);
    }));

    it('ProfilesCtrl:editStyleChange()', inject(function () {
        expect($scope.editStyleChange).toBeDefined();
        $scope.editStyleChange();
    }));

    it('ProfilesCtrl:openProfileModal()', inject(function () {

        var result = {
            policeList: '',
            tailleList: '',
            interligneList: '',
            weightList: '',
            colorList: '',
            spaceSelected: '',
            spaceCharSelected: '',
            type: 'modification',
            editTag: '',
            tagList: ''
        };

        $scope.openProfileModal({
            nom: ''
        });


        modal.openCall(result);


        result = {
            nom: '',
            policeList: '',
            tailleList: '',
            interligneList: '',
            weightList: '',
            colorList: '',
            spaceSelected: '',
            spaceCharSelected: '',
            type: 'other',
            editTag: '',
            tagList: ''
        };
        modal.openCall(result);

        modal.cancelCall('modification');
    }));

    it('ProfilesCtrl:openTagEditModal()', inject(function () {
        expect($scope.openTagEditModal).toBeDefined();
    }));


    it('ProfilesCtrl:openRenameProfilModal()', inject(function () {
        expect($scope.openRenameProfilModal).toBeDefined();
    }));

    it('ProfilesCtrl:initProfil()', inject(function () {
        expect($scope.getProfiles).toBeDefined();
        expect($scope.initDetailProfil).toBeDefined();
        expect($scope.initProfil).toBeDefined();
        $scope.initProfil();
    }));

    it('ProfilesCtrl:mettreParDefaut()', inject(function ($httpBackend) {
        var param = {
            nom: 'Nom2',
            descriptif: 'descriptif',
            photo: '/9j/4AAQSkZJRgABAQAAAQABAAD/wCVAA/9k=',
            owner: '5334398c0bbd4cd21daecf5b',
            _id: '5334398c0bbd4cd21daecf5c'
        };
        $scope.defaultVar = {
            userID: '5334398c0bbd4cd21daecf5b',
            profilID: '533436a90bbd4cd21daecf4b',
            defaultVar: true
        };
        $scope.testEnv = true;
        expect($scope.mettreParDefaut).toBeDefined();
        $scope.mettreParDefaut(param);
        $httpBackend.flush();
        expect($scope.defaultVarFlag).toEqual(profils);
    }));

    it('ProfilesCtrl:isDefault()', inject(function () {
        expect($scope.isDefault).toBeDefined();
        var param = {
            _id: '5334745da32a6fc976535670',
            defaut: true,
            descriptif: 'test',
            nom: 'test',
            owner: '5334743ca32a6fc97653566c',
            stateDefault: true
        };
        expect($scope.isDefault(param)).toBeTruthy();
    }));

    it('ProfilesCtrl:displayOwner()', inject(function () {
        var param = {};
        expect($scope.displayOwner).toBeDefined();

        param.state = 'mine';
        expect($scope.displayOwner(param)).toBe('Moi-même');

        param.state = 'favoris';
        expect($scope.displayOwner(param)).toBe('Favoris');

        param.state = 'delegated';
        expect($scope.displayOwner(param)).toBe('Délégué');

        param.state = 'default';
        expect($scope.displayOwner(param)).toBe('Accessidys');
    }));

    it('ProfilesCtrl:isDeletable()', inject(function () {
        profil.favourite = true;
        profil.delete = true;
        expect($scope.isDeletable(profil)).toBeTruthy();
        profil.delete = false;
        expect($scope.isDeletable(profil)).toBeFalsy();
    }));

    it('ProfilesCtrl:retirerParDefaut()', inject(function ($httpBackend) {
        $scope.testEnv = true;
        $scope.retirerParDefaut(profil);
        $httpBackend.flush();
    }));

    it('ProfilesCtrl:preRemoveFavourite()', function () {
        $scope.preRemoveFavourite(profil);
        expect($scope.profilId).toBe(profil._id);
    });

    it('ProfilesCtrl:removeFavourite()', inject(function ($httpBackend) {
        $scope.testEnv = true;
        $scope.removeFavourite();
        $httpBackend.flush();
    }));

    it('ProfilesCtrl:sendEmailDuplique()', inject(function ($httpBackend) {
        $scope.oldProfil = profil;
        $scope.sendEmailDuplique();
        $httpBackend.flush();
    }));

    it('ProfilesCtrl:preDeleguerProfil()', inject(function ($rootScope) {
        expect($scope.preDeleguerProfil).toBeDefined();
        $scope.preDeleguerProfil(profil);
        expect($scope.delegateEmail).toBe('');
        $rootScope.isAppOnline = false;
        $scope.profDelegue = undefined;
        expect($scope.profDelegue).toBeUndefined();
    }));



    it('ProfilesCtrl:retireDeleguerProfil()', inject(function ($httpBackend) {
        $scope.profRetirDelegue = profil;
        $scope.retireDeleguerProfil();
        $httpBackend.flush();
    }));

    it('ProfilesCtrl:profilApartager()', function () {
        $scope.profilApartager(profil);
        expect($scope.profilPartage).toBe(profil);
    });

    it('ProfilesCtrl:loadMail()', function () {
        $scope.loadMail();
        expect($scope.displayDestination).toBeTruthy();
    });

    it('ProfilesCtrl:clearSocialShare()', function () {
        $scope.clearSocialShare();
    });

    it('ProfilesCtrl:socialShare()', function () {
        $scope.destinataire = 'emailTest@mymail.fr';
        spyOn(location, 'absUrl').andReturn('/detailProfil');
        $scope.profilPartage = profil;
        $scope.socialShare();
    });

    it('ProfilesCtrl:verifyEmail()', function () {
        $scope.verifyEmail('test@test.com');
        expect($scope.verifyEmail('test@test.com')).toBeTruthy();
    });

    it('ProfilesCtrl:sendMail()', inject(function ($httpBackend, $location, $rootScope, configuration) {
        $scope.destination = 'test@test.com';
        $scope.destinataire = 'test@test.com';
        $scope.currentUrl = $location.absUrl();
        $scope.profilPartage = profil;
        $rootScope.currentUser = $scope.dataRecu;
        $scope.sendMail();
        expect($scope.verifyEmail($scope.destination)).toBeTruthy();
        expect($scope.destination.length).not.toBe(null);
        expect($rootScope.currentUser.dropbox.accessToken).not.toBe(null);
        expect(configuration.DROPBOX_TYPE).toBeTruthy();
        expect($rootScope.currentUser).not.toBe(null);
        $scope.sendVar = {
            to: $scope.destinataire,
            content: ' a utilisé Accessidys pour partager un fichier avec vous !  ',
            encoded: '<span> vient d\'utiliser Accessidys pour partager un fichier avec vous !',
            prenom: $rootScope.currentUser.local.prenom,
            fullName: $rootScope.currentUser.local.prenom + ' ' + $rootScope.currentUser.local.nom,
            doc: 'doc'
        };
        $scope.sendMail();
        $httpBackend.flush();
        expect($scope.sent).toBe(true);
    }));

    it('ProfilesCtrl:preAnnulerDeleguerProfil()', inject(function ($rootScope) {
        $scope.preAnnulerDeleguerProfil(profil);
        expect($scope.profAnnuleDelegue).toBe(profil);
        $rootScope.isAppOnline = false;
        $scope.preAnnulerDeleguerProfil = undefined;
        expect($scope.preAnnulerDeleguerProfil).toBeUndefined();
    }));

    it('ProfilesCtrl:annuleDeleguerProfil()', inject(function ($httpBackend) {
        $scope.profAnnuleDelegue = profil;
        $scope.annuleDeleguerProfil();
        $httpBackend.flush();
    }));

    it('ProfilesCtrl:specificFilter()', function () {
        $scope.tests = tests;
        $scope.query = 'nom';
        $scope.specificFilter();
    });

    it('ProfilesCtrl:initDetailProfil()', inject(function ($httpBackend) {
        $scope.initDetailProfil();
    }));

    it('ProfilesCtrl:ajouterAmesFavoris()', inject(function ($httpBackend) {
        $scope.detailProfil = detailProfil;
        $scope.ajouterAmesFavoris();
        $httpBackend.flush();
    }));

    it('ProfilesCtrl:deleguerUserProfil()', inject(function ($httpBackend) {
        $scope.detailProfil = detailProfil;
        $scope.deleguerUserProfil();
        $httpBackend.flush();
    }));

    it('ProfilesCtrl:detailsProfilApartager()', function () {

        $scope.profilPartage = {
            _id: '52d8f928548367ee2d000006',
            photo: './files/profilImage.jpg',
            descriptif: 'descriptif3',
            nom: 'Nom3',
            delegate: true,
            preDelegated: '52d8f928548367ee2d53424232'
        };
        console.log($scope.profilPartage);
        $scope.detailsProfilApartager();
    });

    it('ProfilesCtrl:affichageInfoDeconnecte()', function () {
        $scope.affichageInfoDeconnecte();

        expect(modalParameters.templateUrl).toEqual('views/common/informationModal.html');
        var modalContent = modalParameters.resolve.reason();
        expect(modalContent).toEqual('/profiles');
    });

    it('ProfilesCtrl:getTagsDescription()', function () {
        var result = $scope.getTagsDescription('52c6cde4f6f46c5a5a000004');
        expect(result.libelle).toEqual('Exercice');
    });

    it('ProfilesCtrl:generateProfileName()', function () {
        $scope.profiles = profiles;
        var result = $scope.generateProfileName('prenom', 0, 0);
        expect(result).toEqual('prenom');
    });

    it('ProfilesCtrl:attachGoogle()', function () {

        var options;
        gapi = {
            interactivepost: {
                render: function (arg1, arg2) {
                    options = arg2;
                }
            }
        };

        $scope.attachGoogle();

        options.callback('test');
        options.onshare('test');
        $scope.googleShareStatus = 2;
        options.onshare({
            status: 'started'
        });

    });
});