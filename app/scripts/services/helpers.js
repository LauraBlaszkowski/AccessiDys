/*File: helpers.js
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

var cnedApp = cnedApp;


// include underscore
cnedApp.factory('_', function () {
    return window._; // assumes underscore has already been loaded on the
    // page
});

cnedApp.filter('md5Filter', function (md5) {
    return function (input) {
        if (typeof input === 'string') {
            return md5.createHash(input);
        } else {
            return input;
        }
    };
});

cnedApp.filter('docNameFilter', function () {
    return function (input) {
        input = decodeURIComponent(input);
        var filenameStartIndex = input.indexOf('_') + 1;
        var filenameEndIndex = input.lastIndexOf('_');
        var shortFilename = input.substring(filenameStartIndex, filenameEndIndex);
        return shortFilename;
    };
});
cnedApp.factory('protocolToLowerCase', function () {
    /**
     * if the http/https protocol is uppercase, return the url with lowercase
     * protocol
     *
     * @param {string}
     *            url parameter url
     * @return {string} the url with lowercased protocol
     */
    return function (url) {
        var match = new RegExp('http(s)?', 'ig').exec(url);
        return url.replace(match[0], match[0].toLowerCase());
    };
});

cnedApp.factory('canvasToImage', function () {
    /**
     * Converts a canvas in image.
     *
     * @param canvas
     *            The canvas to convert
     * @param context
     *            The context of the canvas
     * @param backgroundColor
     *            the background color to be applied to the canvas before its conversion
     * @method $scope.canvasToImage
     */
    return function (canvas, context, backgroundColor) {
        var data;
        var width = canvas.width;
        var height = canvas.height;
        var compositeOperation;

        if (backgroundColor) {
            data = context.getImageData(0, 0, width, height);
            compositeOperation = context.globalCompositeOperation;
            context.globalCompositeOperation = 'destination-over';
            context.fillStyle = backgroundColor;
            context.fillRect(0, 0, width, height);
        }

        var imageData = canvas.toDataURL('image/png');

        if (backgroundColor) {
            context.clearRect(0, 0, width, height);
            context.putImageData(data, 0, 0);
            context.globalCompositeOperation = compositeOperation;
        }

        return imageData;
    };
});

// Replace the HTML codes of accents.
cnedApp.factory('removeAccents', function () {
    return function (value) {
        return value.replace(/&acirc;/g, 'â')
            .replace(/&Acirc;/g, 'Â')
            .replace(/&agrave;/g, 'à')
            .replace(/&Agrave;/g, 'À')
            .replace(/&eacute;/g, 'é')
            .replace(/&Eacute;/g, 'É')
            .replace(/&ecirc;/g, 'ê')
            .replace(/&Ecirc;/g, 'Ê')
            .replace(/&egrave;/g, 'è')
            .replace(/&Egrave;/g, 'È')
            .replace(/&euml;/g, 'ë')
            .replace(/&Euml;/g, 'Ë')
            .replace(/&icirc;/g, 'î')
            .replace(/&Icirc;/g, 'Î')
            .replace(/&iuml;/g, 'ï')
            .replace(/&Iuml;/g, 'Ï')
            .replace(/&ocirc;/g, 'ô')
            .replace(/&Ocirc;/g, 'Ô')
            .replace(/&oelig;/g, 'œ')
            .replace(/&Oelig;/g, 'Œ')
            .replace(/&ucirc;/g, 'û')
            .replace(/&Ucirc;/g, 'Û')
            .replace(/&ugrave;/g, 'ù')
            .replace(/&Ugrave;/g, 'Ù')
            .replace(/&uuml;/g, 'ü')
            .replace(/&Uuml;/g, 'Ü')
            .replace(/&ccedil;/g, 'ç')
            .replace(/&Ccedil;/g, 'Ç')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>');
    };
});

/**
 * Delete accents, put in small letter and delete spaces
 *
 * @param string
 * @method removeStringsUppercaseSpaces
 */
cnedApp.factory('removeStringsUppercaseSpaces', function () {
    return function (string) {
        // apply toLowerCase() function
        string = string.toLowerCase();
        // specified letters for replace
        var from = 'àáäâèéëêěìíïîòóöôùúüûñçčřšýžďť';
        var to = 'aaaaeeeeeiiiioooouuuunccrsyzdt';
        // replace each special letter
        for (var i = 0; i < from.length; i++)
            string = string.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
        string = string.replace(/ /g, '');
        // return clean string
        return string;
    };
});

// Clean the text of the HTML tags
cnedApp.factory('removeHtmlTags', function () {
    // return value.replace(/['"]/g, "");
    return function (value) {
        return value.replace(/<\/?[^>]+(>|$)/g, '');
    };
});

/* Get Plain text without html tags */
cnedApp.factory('htmlToPlaintext', function () {
    return function (text) {
        return String(text).replace(/<(?:.|\n)*?>/gm, '');
    };
});

/* Generate a unique key*/
cnedApp.factory('generateUniqueId', function () {
    return function () {
        var date = new Date().getTime();
        date += (parseInt(Math.random() * 1000)).toString();
        return date;
    };
});

/* regex email */
cnedApp.factory('verifyEmail', function () {
    return function (email) {
        var reg = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return reg.test(email);
    };
});


cnedApp.factory('serviceCheck',
    function ($http, $q, $location, configuration, dropbox, protocolToLowerCase, $rootScope, $localForage, UtilsService, $timeout) {

        var statusInformation = {};
        return {
            getData: function () {
                var deferred = $q.defer();
                if (localStorage.getItem('guest')) {
                    localStorage.removeItem('guest');
                    localStorage.removeItem('compteId');
                }
                statusInformation = {};
                var isAppOnlineNotReady;
                var data = {
                    id: false
                };
                if (localStorage.getItem('compteId')) {
                    data = {
                        id: localStorage.getItem('compteId')
                    };

                    if ($rootScope.isAppOnline === undefined) {
                        isAppOnlineNotReady = true;
                    } else {
                        isAppOnlineNotReady = false;
                    }

                    if ($rootScope.isAppOnline || ($rootScope.isAppOnline === undefined && navigator.onLine === true)) {
                        $http.get(configuration.URL_REQUEST + '/profile?id=' + data.id)
                            .success(function (data) {
                                // save all the informations for the disconnected mode.
                                $localForage.removeItem('compteOffline').then(function () {
                                    $localForage.setItem('compteOffline', data);
                                });
                                statusInformation.loged = true;
                                $rootScope.loged = true;
                                if (data.dropbox) {
                                    statusInformation.dropboxWarning = true;
                                    statusInformation.user = data;
                                    if (data.local.role === 'admin') {
                                        $rootScope.admin = true;
                                        statusInformation.admin = true;
                                    } else {
                                        $rootScope.admin = false;
                                        statusInformation.admin = false;
                                    }
                                } else {
                                    if ($location.path() !== '/inscriptionContinue') {
                                        statusInformation.redirected = 'ok';
                                        statusInformation.path = '/inscriptionContinue';
                                        statusInformation.dropboxWarning = false;
                                    } else {
                                        statusInformation.dropboxWarning = false;
                                    }
                                }

                                deferred.resolve(statusInformation);
                            })
                            .error(function (data, status, headers, config) {
                                if (data.code === 2) {
                                    // The session of to user has expired.
                                    statusInformation.inactif = true;
                                    statusInformation.loged = false;
                                    statusInformation.dropboxWarning = true;
                                    deferred.resolve(statusInformation);
                                    if ($rootScope.loged || $rootScope.loged === undefined && !localStorage.getItem('deconnexion')) {
                                        UtilsService.showInformationModal('label.session.expired', 'label.session.re-login', '/');

                                    }
                                    $rootScope.loged = false;
                                    $rootScope.dropboxWarning = true;

                                } else if (data.code === 1) {
                                    // the token of the user is not found. Delete all data stored locally.
                                    localStorage.clear();
                                    $localForage.clear().then(function () {
                                        $rootScope.loged = false;
                                        $rootScope.dropboxWarning = false;
                                        $rootScope.admin = null;
                                        $rootScope.currentUser = {};
                                        $rootScope.listDocumentDropBox = '';
                                        $rootScope.uploadDoc = {};
                                        $timeout(function () {
                                            window.location.href = configuration.URL_REQUEST;
                                        }, 1000);
                                        statusInformation.deleted = true;
                                        statusInformation.loged = false;
                                        statusInformation.dropboxWarning = true;

                                        deferred.resolve(statusInformation);
                                    });
                                } else if (isAppOnlineNotReady) {
                                    // retrieve informations from the disconnected mode and continue
                                    $localForage.getItem('compteOffline').then(function (result) {
                                        data = result;
                                        $rootScope.currentUser = data;
                                        statusInformation.loged = true;
                                        $rootScope.loged = true;
                                        if (data.dropbox) {
                                            statusInformation.dropboxWarning = true;
                                            statusInformation.user = data;
                                            if (data.local.role === 'admin') {
                                                $rootScope.admin = true;
                                                statusInformation.admin = true;
                                            } else {
                                                $rootScope.admin = false;
                                                statusInformation.admin = false;

                                            }
                                        } else {
                                            if ($location.path() !== '/inscriptionContinue') {
                                                statusInformation.redirected = 'ok';
                                                statusInformation.path = '/inscriptionContinue';
                                                statusInformation.dropboxWarning = false;
                                            } else {
                                                statusInformation.dropboxWarning = false;
                                            }

                                        }
                                        deferred.resolve(statusInformation);
                                    });
                                }

                            });

                    } else {
                        // retrieve information from the disconnected mode and continue
                        $localForage.getItem('compteOffline').then(function (result) {
                            if (data) {
                                data = result;
                                $rootScope.currentUser = data;
                                statusInformation.loged = true;
                                $rootScope.loged = true;
                                if (data.dropbox) {
                                    statusInformation.dropboxWarning = true;
                                    statusInformation.user = data;
                                    if (data.local.role === 'admin') {
                                        $rootScope.admin = true;
                                        statusInformation.admin = true;
                                    } else {
                                        $rootScope.admin = false;
                                        statusInformation.admin = false;
                                    }
                                    deferred.resolve(statusInformation);
                                } else {
                                    if ($location.path() !== '/inscriptionContinue') {
                                        statusInformation.redirected = 'ok';
                                        statusInformation.path = '/inscriptionContinue';
                                        statusInformation.dropboxWarning = false;
                                    } else {
                                        statusInformation.dropboxWarning = false;
                                    }
                                    deferred.resolve(statusInformation);
                                }
                            } else {
                                $rootScope.loged = false;
                                statusInformation.loged = false;
                                statusInformation.dropboxWarning = true;
                                deferred.resolve(statusInformation);
                                if ($location.path() !== '/' && $location.path() !== '/passwordHelp' && $location.path() !== '/detailProfil' && $location.path() !== '/needUpdate' && $location.path() !== '/mentions' && $location.path() !== '/signup') {
                                    $location.path('/');
                                }
                            }
                        });
                    }

                } else {

                    //Not connected

                    $rootScope.loged = false;
                    statusInformation.loged = false;
                    statusInformation.dropboxWarning = true;
                    deferred.resolve(statusInformation);

                    //when the user is not authenticated
                    //and attempts to access features,
                    // redirect to the login page.
                    if ($location.path() === '/apercu' || $location.path() === '/print') {

                        //Show of shared document

                        $rootScope.isGuest = true;
                        localStorage.setItem('guest', true);
                    } else if ($location.path() !== '/'
                        && $location.path() !== '/passwordHelp'
                        && $location.path() !== '/detailProfil'
                        && $location.path() !== '/needUpdate'
                        && $location.path() !== '/mentions'
                        && $location.path() !== '/contribuer'
                        && $location.path() !== '/a-propos'
                        && $location.path() !== '/signup'
                        && $location.path() !== '/apercu'
                        && $location.path() !== '/print') {
                        $location.path('/');
                    }
                }
                return deferred.promise;
            },
            filePreview: function (fileUrl, token) {

                var deferred = $q.defer();
                var data = {
                    id: false
                };
                if (localStorage.getItem('compteId')) {
                    data = {
                        id: localStorage.getItem('compteId'),
                        lien: fileUrl
                    };
                    var serviceName = '';
                    if (fileUrl.indexOf('https') > -1) {
                        if (fileUrl.indexOf('.pdf') > -1) {
                            serviceName = '/previewPdfHTTPS';
                        } else if (fileUrl.indexOf('.epub') > -1) {
                            serviceName = '/externalEpubPreview';
                        } else {
                            serviceName = '/htmlPage';
                        }
                    } else {
                        if (fileUrl.indexOf('.pdf') > -1) {
                            serviceName = '/previewPdf';
                        } else if (fileUrl.indexOf('.epub') > -1) {
                            serviceName = '/externalEpubPreview';
                        } else {
                            serviceName = '/htmlPage';
                        }
                    }
                    $http.post(configuration.URL_REQUEST + serviceName, data)
                        .success(function (data) {
                            if (data && data.length > 0) {
                                data = data.replace(/\/+/g, '');
                                statusInformation.documentSignature = data;
                                statusInformation.cryptedSign = data;
                                var tmp5 = dropbox.search(statusInformation.cryptedSign, token);
                                tmp5.then(function (searchResult) {
                                    statusInformation.existeDeja = false;
                                    if (searchResult.length > 0) {
                                        var i = 0;
                                        for (i = 0; i < searchResult.length; i++) {
                                            if (searchResult[i].path.indexOf(statusInformation.cryptedSign) > 0 && searchResult.matches[i].metadata.path_display.indexOf('.html') > -1) {
                                                statusInformation.found = searchResult;
                                                statusInformation.existeDeja = true;
                                                break;
                                            }
                                        }
                                    } else {
                                        statusInformation.existeDeja = false;
                                    }
                                    statusInformation.erreurIntern = false;
                                    deferred.resolve(statusInformation);
                                });
                            } else {
                                statusInformation.erreurIntern = true;
                                deferred.resolve(statusInformation);
                            }
                            return deferred.promise;
                        }).error(function (err) {
                        deferred.reject(err);
                    });
                } else {
                    statusInformation.loged = false;
                    statusInformation.dropboxWarning = true;
                    deferred.resolve(statusInformation);
                }
                return deferred.promise;
            },
            htmlPreview: function (htmlUrl, token) {
                htmlUrl = protocolToLowerCase(htmlUrl);
                var deferred = $q.defer();
                var data = {
                    id: false
                };
                var finalData = {};
                data = {
                    lien: htmlUrl
                };
                var serviceName = '/htmlPage';
                $http.post(configuration.URL_REQUEST + serviceName, data)
                    .success(function (data) {
                        if (data && data.length > 0) {
                            finalData.documentHtml = data;
                        } else {
                            finalData.erreurIntern = true;
                            deferred.resolve(finalData);
                        }
                        deferred.resolve(finalData);
                        return deferred.promise;
                    }).error(function (err) {
                    deferred.reject(err);
                });
                return deferred.promise;
            },
            htmlReelPreview: function (htmlUrl) {
                var deferred = $q.defer();
                var data2 = {
                    id: false
                };
                var htmlplPreview = {};
                if (localStorage.getItem('compteId')) {
                    data2 = {
                        id: localStorage.getItem('compteId'),
                        lien: htmlUrl
                    };
                    var serviceName = '/htmlPagePreview';
                    $http.post(configuration.URL_REQUEST + serviceName, data2)
                        .success(function (data2) {
                            if (data2) {
                                htmlplPreview.sign = data2;
                            }
                            deferred.resolve(htmlplPreview);
                            return deferred.promise;
                        }).error(function () {
                        htmlplPreview.erreurIntern = true;
                        deferred.resolve(htmlplPreview);
                    });
                } else {
                    htmlplPreview.loged = false;
                    htmlplPreview.dropboxWarning = true;
                    deferred.resolve(htmlplPreview);
                }
                return deferred.promise;
            },
            getSign: function (chunck) {
                var deferred = $q.defer();
                var loacalSign = {
                    id: false
                };
                var localFilePreview = {};
                if (localStorage.getItem('compteId')) {
                    loacalSign = {
                        id: localStorage.getItem('compteId'),
                        filechunck: chunck
                    };
                    var serviceName = '/generateSign';
                    $http.post(configuration.URL_REQUEST + serviceName, loacalSign)
                        .success(function (loacalSign) {
                            console.log('loacalSign --> ', loacalSign);
                            if (loacalSign && loacalSign.sign) {
                                localFilePreview.sign = loacalSign.sign;
                            }
                            deferred.resolve(localFilePreview);
                            return deferred.promise;
                        }).error(function () {
                        localFilePreview.erreurIntern = true;
                        deferred.resolve(localFilePreview);
                    });
                } else {
                    localFilePreview.loged = false;
                    localFilePreview.dropboxWarning = true;
                    deferred.resolve(localFilePreview);
                }
                return deferred.promise;
            },
            htmlImage: function (htmlUrl, token) {
                var deferred = $q.defer();
                var data = {
                    id: false
                };
                var finalData = {};
                if (localStorage.getItem('compteId')) {
                    data = {
                        id: localStorage.getItem('compteId'),
                        lien: htmlUrl
                    };
                    var serviceName = '/htmlImage';
                    $http.post(configuration.URL_REQUEST + serviceName, data)
                        .success(function (data) {
                            if (data && data.img.length > 0) {
                                finalData.htmlImages = data.img;
                            }
                            deferred.resolve(finalData);
                            return deferred.promise;
                        }).error(function () {
                        finalData.erreurIntern = true;
                        deferred.resolve(finalData);
                    });
                } else {
                    finalData.loged = false;
                    finalData.dropboxWarning = true;
                    deferred.resolve(finalData);
                }
                return deferred.promise;
            },
            deconnect: function () {
                var deferred = $q.defer();
                var data = {
                    id: false
                };
                if (localStorage.getItem('compteId')) {
                    data = {
                        id: localStorage.getItem('compteId')
                    };
                    localStorage.removeItem('compteId');
                    $http.get(configuration.URL_REQUEST + '/logout?id=' + data.id)
                        .success(function () {
                            statusInformation.deconnected = true;
                            deferred.resolve(statusInformation);
                        }).error(function () {
                        statusInformation.deconnected = false;
                        deferred.resolve(statusInformation);
                    });
                } else {
                    statusInformation.loged = false;
                    statusInformation.dropboxWarning = true;
                    deferred.resolve(statusInformation);
                }
                return deferred.promise;
            },
            checkName: function (str) {
                return /^[a-zA-Z0-9 àâæçéèêëîïôœùûüÿÀÂÆÇÉÈÊËÎÏÔŒÙÛÜŸ]*$/g.test(str); // jshint ignore:line
            },
            isOnline: function () {
                return $http.head(configuration.URL_REQUEST + '?t=' + Date.now());
            }
        };
    }
);


cnedApp.factory('dropbox', ['$http', '$q', '$rootScope', 'appCrash', 'configuration',
    function ($http, $q, $rootScope, appCrash, configuration) {

        var retryCount = 0;

        var downloadService = function (path, access_token) {
            if (typeof $rootScope.socket !== 'undefined') {
                $rootScope.socket.emit('dropBoxEvent', {
                    message: '[DropBox Operation Begin] : Download [query] :' + path + ' [access_token] :' + access_token + ' [user_token] ' + localStorage.getItem('compteId')
                });
            }

            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: 'https://content.dropboxapi.com/2/files/download',
                headers: {
                    'Authorization': 'Bearer ' + access_token,
                    'Dropbox-API-Arg': decodeURIComponent(JSON.stringify({
                        'path': path
                    }))
                }
            }).success(function (data) {
                if (typeof $rootScope.socket !== 'undefined') {
                    $rootScope.socket.emit('dropBoxEvent', {
                        message: '[DropBox Operation End-Success] : Download [query] :' + path + ' [access_token] :' + access_token + ' [user_token] ' + localStorage.getItem('compteId')
                    });
                }
                retryCount = 0;
                deferred.resolve(data);
            }).error(function (data, status) {
                if ((status === 401 || status === 504 || status === 408) && retryCount < 3) { // jshint ignore:line
                    retryCount++;
                    downloadService(path, access_token);
                } else {
                    retryCount = 0;
                    //Do not show the pop-up
                    // because we try to get the contents from the cache: appCrash.showPop(data);
                    deferred.reject();
                    if (typeof $rootScope.socket !== 'undefined') {
                        $rootScope.socket.emit('dropBoxEvent', {
                            message: '[DropBox Operation End-Error] : Download [query] :' + path + ' [access_token] :' + access_token + ' [user_token] ' + localStorage.getItem('compteId')
                        });
                    }
                }
            });
            return deferred.promise;
        };
        var uploadService = function (filename, dataToSend, access_token, noPopup) {
            if (typeof $rootScope.socket !== 'undefined') {
                $rootScope.socket.emit('dropBoxEvent', {
                    message: '[DropBox Operation Begin] : Upload [query] :' + filename + ' [access_token] :' + access_token + ' [user_token] ' + localStorage.getItem('compteId')
                });
            }
            var deferred = $q.defer();

            // Fixing missing / in path
            if (filename.charAt(0) !== '/') {
                filename = '/' + filename;
            }

            if (filename.indexOf(configuration.DROPBOX_PATH) < 0) {
                filename = configuration.DROPBOX_PATH + filename;
            }


            $http({
                method: 'POST',
                url: 'https://content.dropboxapi.com/2/files/upload',
                data: dataToSend,
                headers: {
                    'Authorization': 'Bearer ' + access_token,
                    'Content-Type': 'application/octet-stream',
                    'Dropbox-API-Arg': decodeURIComponent(JSON.stringify({
                        path: filename,
                        mode: 'overwrite'
                    }))
                }
            }).success(function (data) {
                if (typeof $rootScope.socket !== 'undefined') {
                    $rootScope.socket.emit('dropBoxEvent', {
                        message: '[DropBox Operation End-Success] : Upload [query] :' + filename + ' [access_token] :' + access_token + ' [user_token] ' + localStorage.getItem('compteId')
                    });
                }
                retryCount = 0;
                deferred.resolve(data);
            }).error(function (data, status) {
                if ((status === 401 || status === 504 || status === 408) && retryCount < 3) { // jshint ignore:line
                    retryCount++;
                    uploadService(filename, dataToSend, access_token);
                } else {
                    retryCount = 0;
                    if (!noPopup) {
                        appCrash.showPop(data);
                    }
                    deferred.reject(data);
                    if (typeof $rootScope.socket !== 'undefined') {
                        $rootScope.socket.emit('dropBoxEvent', {
                            message: '[DropBox Operation End-Error] : Upload [query] :' + filename + ' [access_token] :' + access_token + ' [user_token] ' + localStorage.getItem('compteId')
                        });
                    }
                }
            });
            return deferred.promise;
        };
        var deleteService = function (filename, access_token, noPopup) {
            if (typeof $rootScope.socket !== 'undefined') {
                $rootScope.socket.emit('dropBoxEvent', {
                    message: '[DropBox Operation Begin] : Delete [query] :' + filename + ' [access_token] :' + access_token + ' [user_token] ' + localStorage.getItem('compteId')
                });
            }
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: 'https://api.dropboxapi.com/2/files/delete',
                data: {
                    path: filename
                },
                headers: {
                    'Authorization': 'Bearer ' + access_token,
                    'Content-Type': 'application/json'
                }
            }).success(function (data) {
                if (typeof $rootScope.socket !== 'undefined') {
                    $rootScope.socket.emit('dropBoxEvent', {
                        message: '[DropBox Operation End-Success] : Delete [query] :' + filename + ' [access_token] :' + access_token + ' [user_token] ' + localStorage.getItem('compteId')
                    });
                }
                retryCount = 0;
                deferred.resolve(data);
            }).error(function (data, status) {
                if ((status === 401 || status === 504 || status === 408) && retryCount < 3) { // jshint ignore:line
                    retryCount++;
                    deleteService(filename, access_token);
                } else {
                    retryCount = 0;
                    if (!noPopup) {
                        appCrash.showPop(data);
                    }

                    deferred.reject(data);

                    if (typeof $rootScope.socket !== 'undefined') {
                        $rootScope.socket.emit('dropBoxEvent', {
                            message: '[DropBox Operation End-Error] : Delete [query] :' + filename + ' [access_token] :' + access_token + ' [user_token] ' + localStorage.getItem('compteId')
                        });
                    }
                }
            });
            return deferred.promise;
        };
        var searchService = function (query, access_token) {
            if (typeof $rootScope.socket !== 'undefined') {
                $rootScope.socket.emit('dropBoxEvent', {
                    message: '[DropBox Operation Begin] : Search [query] :' + query + ' [access_token] :' + access_token + ' [user_token] ' + localStorage.getItem('compteId')
                });
            }
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: 'https://api.dropboxapi.com/2/files/search',
                data: {
                    path: '',
                    query: query,
                    start: 0,
                    mode: 'filename',
                    max_results: 1000
                },
                headers: {
                    'Authorization': 'Bearer ' + access_token,
                    'Content-Type': 'application/json'
                }
            }).success(function (data, status) {
                $rootScope.ErrorModalMessage = 'le message depuis rootScope';
                $rootScope.ErrorModalTitre = 'le titre depuis rootScope';

                if (typeof $rootScope.socket !== 'undefined') {
                    $rootScope.socket.emit('dropBoxEvent', {
                        message: '[DropBox Operation End-Success] : Search [query] :' + query + ' [access_token] :' + access_token + ' [user_token] ' + localStorage.getItem('compteId')
                    });
                }
                retryCount = 0;
                data.status = status;
                deferred.resolve(data);
            }).error(function (data, status) {
                if ((status === 401 || status === 504 || status === 408) && retryCount < 3) { // jshint ignore:line
                    retryCount++;
                    searchService(query, access_token);
                } else {
                    retryCount = 0;
                    //Do not show the pop-up
                    // because we try to get the contents from the cache: appCrash.showPop(data);
                    deferred.reject(data);
                    if (typeof $rootScope.socket !== 'undefined') {
                        $rootScope.socket.emit('dropBoxEvent', {
                            message: '[DropBox Operation End-Error] : Search [query] :' + query + ' [access_token] :' + access_token + ' [user_token] ' + localStorage.getItem('compteId')
                        });
                    }
                }
            });
            return deferred.promise;
        };
        var shareLinkService = function (path, access_token) {
            if (typeof $rootScope.socket !== 'undefined') {
                $rootScope.socket.emit('dropBoxEvent', {
                    message: '[DropBox Operation Begin] : ShareLink [query] :' + path + ' [access_token] :' + access_token + ' [user_token] ' + localStorage.getItem('compteId')
                });
            }
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: 'https://api.dropboxapi.com/2/sharing/create_shared_link_with_settings',
                data: {
                    path: path,
                    settings: {
                        requested_visibility: 'public'
                    }
                },
                headers: {
                    'Authorization': 'Bearer ' + access_token,
                    'Content-Type': 'application/json'
                }
            }).success(function (data, status) {
                if (typeof $rootScope.socket !== 'undefined') {
                    $rootScope.socket.emit('dropBoxEvent', {
                        message: '[DropBox Operation End-Success] : ShareLink [query] :' + path + ' [access_token] :' + access_token + ' [user_token] ' + localStorage.getItem('compteId')
                    });
                }
                if (data) {
                    if (data.url.indexOf('.appcache') > -1) {
                        var linkStart = data.url.indexOf('manifest="');
                        var linkEnd = data.url.indexOf('.appcache', linkStart) + 9;
                        data.url = data.url.substring(linkStart, linkEnd);
                    }
                    data.url = data.url.replace('https://www.dropbox.com', 'https://dl.dropboxusercontent.com');
                    data.status = status;
                }
                retryCount = 0;
                deferred.resolve(data);
            }).error(function (data, status) {
                if (data.error && data.error['.tag'] === 'shared_link_already_exists') {

                    listShareLinkService(path, access_token).then(function (data) {
                        deferred.resolve(data);
                    });

                } else {
                    if ((status === 401 || status === 504 || status === 408) && retryCount < 3) { // jshint ignore:line
                        retryCount++;
                        shareLinkService(path, access_token);
                    } else {
                        retryCount = 0;
                        if (typeof $rootScope.socket !== 'undefined') {
                            $rootScope.socket.emit('dropBoxEvent', {
                                message: '[DropBox Operation End-Error] : ShareLink [query] :' + path + ' [access_token] :' + access_token + ' [user_token] ' + localStorage.getItem('compteId')
                            });
                        }
                    }

                    appCrash.showPop(data);
                    deferred.reject(data);
                }

            });
            return deferred.promise;
        };

        var listShareLinkService = function (path, access_token) {
            if (typeof $rootScope.socket !== 'undefined') {
                $rootScope.socket.emit('dropBoxEvent', {
                    message: '[DropBox Operation Begin] : List ShareLink [query] :' + path + ' [access_token] :' + access_token + ' [user_token] ' + localStorage.getItem('compteId')
                });
            }
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: 'https://api.dropboxapi.com/2/sharing/list_shared_links',
                data: {
                    path: path
                },
                headers: {
                    'Authorization': 'Bearer ' + access_token,
                    'Content-Type': 'application/json'
                }
            }).success(function (data, status) {
                if (typeof $rootScope.socket !== 'undefined') {
                    $rootScope.socket.emit('dropBoxEvent', {
                        message: '[DropBox Operation End-Success] : List ShareLink [query] :' + path + ' [access_token] :' + access_token + ' [user_token] ' + localStorage.getItem('compteId')
                    });
                }
                retryCount = 0;

                if (data && data.links) {
                    var link = data.links[0];

                    if (link.url.indexOf('.appcache') > -1) {
                        var linkStart = link.url.indexOf('manifest="');
                        var linkEnd = link.url.indexOf('.appcache', linkStart) + 9;
                        link.url = link.url.substring(linkStart, linkEnd);
                    }

                    link.status = status;
                    link.url = link.url.replace('https://www.dropbox.com', 'https://dl.dropboxusercontent.com');
                    deferred.resolve(link);
                } else {
                    deferred.resolve(null);
                }

            }).error(function (data, status) {
                if ((status === 401 || status === 504 || status === 408) && retryCount < 3) { // jshint ignore:line
                    retryCount++;
                    listShareLinkService(path, access_token);
                } else {
                    retryCount = 0;
                    if (typeof $rootScope.socket !== 'undefined') {
                        $rootScope.socket.emit('dropBoxEvent', {
                            message: '[DropBox Operation End-Error] : List ShareLink [query] :' + path + ' [access_token] :' + access_token + ' [user_token] ' + localStorage.getItem('compteId')
                        });
                    }
                    appCrash.showPop(data);
                    deferred.reject(data);
                }


            });
            return deferred.promise;
        };
        var renameService = function (oldFilePath, newFilePath, access_token, noPopup) {
            if (typeof $rootScope.socket !== 'undefined') {
                $rootScope.socket.emit('dropBoxEvent', {
                    message: '[DropBox Operation Begin] : Rename [query] : Old -> ' + oldFilePath + ' New -> ' + newFilePath + ' [access_token] :' + access_token + ' [user_token] ' + localStorage.getItem('compteId')
                });
            }
            var deferred = $q.defer();

            downloadService(oldFilePath, access_token).then(function (data) {
                var documentData = data;

                deleteService(oldFilePath, access_token, true).then(function () {

                    uploadService(newFilePath, documentData, access_token, true).then(function (data) {
                        deferred.resolve(data);
                    }, function (data) {
                        if (!noPopup) {
                            appCrash.showPop(data);
                        }
                        deferred.reject();
                    });

                }, function (data) {
                    if (!noPopup) {
                        appCrash.showPop(data);
                    }
                    deferred.reject();
                });

            }, function (data) {
                if (!noPopup) {
                    appCrash.showPop(data);
                }
                deferred.reject();
            });

            return deferred.promise;
        };
        return {
            upload: uploadService,
            delete: deleteService,
            search: searchService,
            shareLink: shareLinkService,
            download: downloadService,
            rename: renameService
        };
    }
]);

cnedApp.factory('appCrash',
    function (UtilsService) {
        return {
            showPop: function (err) {
                UtilsService.showInformationModal('INFORMATION', 'L\'application n\'a pas pu se connecter à DropBox.', null, true);
            }
        };
    }
);


/*
 * LocalStorage Operations
 */

cnedApp.factory('storageService', ['$q', 'localStorageCheck',
    function ($q, localStorageCheck) {
        var deferred = $q.defer();
        var writeStorage = function (listElement, count) {
            console.log(listElement[count]);
            localStorage.setItem(listElement[count].name, listElement[count].value);
            var tmp = localStorageCheck.checkIfExist(listElement[count].name);
            tmp.then(function (data) {
                if (data) {
                    if (listElement.length - 1 == count) { // jshint ignore:line
                        deferred.resolve({
                            confirmed: true
                        });
                        return deferred.promise;
                    } else {
                        count++;
                        writeStorage(listElement, count);
                    }
                }
            });
            return deferred.promise;
        };

        var readStorage = function (elementName, count) {
            if (localStorage.getItem(elementName)) {
                deferred.resolve({
                    exist: true,
                    value: localStorage.getItem(elementName)
                });
            } else {
                console.log('Element not found in localStorage');
                deferred.resolve({
                    exist: false,
                    value: null
                });
            }
            return deferred.promise;
        };

        var removeStorage = function (listElement, count) {
            localStorage.removeItem(listElement[count]);
            var tmp = localStorageCheck.checkIfRemoved(listElement[count]);
            tmp.then(function (data) {
                if (data) {
                    if (listElement.length - 1 == count) { // jshint ignore:line
                        console.log('return promess responce');
                        deferred.resolve({
                            confirmed: true
                        });
                    } else {
                        count++;
                        console.log('next element to remove');
                        removeStorage(listElement, count);
                    }
                }
            });
            return deferred.promise;
        };

        return {
            writeService: writeStorage,
            readService: readStorage,
            removeService: removeStorage
        };
    }
]);

cnedApp.factory('localStorageCheck', ['$q', '$timeout', function ($q, $timeout) {

    var timeIntervalInSec = 0.5;
    var deferred = $q.defer();

    function checkIfExist(itemName) {
        if (localStorage.getItem(itemName)) {
            console.log('element checked');
            deferred.resolve({
                confirmed: true
            });
        } else {
            console.log('recurcive add LocalStorage');
            $timeout(checkIfExist(itemName), 1000 * timeIntervalInSec);
        }
        return deferred.promise;
    }

    var checkIfRemoved = function (itemName) {
        if (localStorage.getItem(itemName) === null) {
            console.log('element removed');
            deferred.resolve({
                confirmed: true
            });
        } else {
            console.log('recurcive delete LocalStorage');
            $timeout(checkIfRemoved(itemName), 1000 * timeIntervalInSec);
        }
        return deferred.promise;
    };
    return {
        checkIfExist: checkIfExist,
        checkIfRemoved: checkIfRemoved
    };
}]);

// HTTP interceptor
cnedApp.factory('app.httpinterceptor', ['$q', '_', '$rootScope',
    function ($q, _, $rootScope) {
        return {
            // optional method
            'request': function (config) {
                var exeptionUrl = ['views/addDocument/addDocument.html',
                    'views/common/header.html',
                    'views/listDocument/listDocument.html',
                    'views/index/main.html',
                    'views/adminPanel/adminPanel.html',
                    'views/common/footer.html',
                    'views/passport/inscriptionContinue.html',
                    'views/passwordRestore/passwordRestore.html',
                    'views/workspace/apercu.html',
                    'views/workspace/print.html',
                    'views/profiles/profiles.html',
                    'views/tag/tag.html',
                    'views/userAccount/userAccount.html',
                    'views/profiles/detailProfil.html',
                    'views/common/errorHandling.html',
                    'views/404/404.html',
                    'views/needUpdate/needUpdate.html',
                    'views/mentions/mentions.html',
                    'template/carousel/slide.html',
                    'template/carousel/carousel.html',
                    'views/signup/signup.html',
                    'uib/template/modal/backdrop.html',
                    'uib/template/modal/window.html',
                    'views/common/information.modal.html',
                    'views/synchronisation/resultatSynchronisationModal.html',
                    'views/listDocument/listDocumentModal.html',
                    'views/profiles/profilAffichageModal.html',
                    'views/profiles/editProfilStyleModal.html',
                    'views/profiles/renameProfilModal.html',
                    'views/social-share/social-share.modal.html',
                    'views/common/confirm.modal.html'];
                if (config.method == 'GET') { // jshint ignore:line
                    if (!_.contains(exeptionUrl, config.url)) {
                        var separator = config.url.indexOf('?') === -1 ? '?' : '&';
                        if ($rootScope.testEnv) {
                            config.url = config.url;
                        } else {
                            config.url = config.url + separator + 't=' + Date.now();
                        }
                    }
                }
                return config || $q.when(config);
            },
            // optional method
            'requestError': function (rejection) {
                return $q.reject(rejection);
            },
            // optional method
            'response': function (response) {
                return response || $q.when(response);
            }
        };
    }
]);
// Define a simple audio service
/*
 * cnedApp.factory(' audio ', function($document) { var audioElement =
 * $document[0].createElement(' audio '); // <-- Magic trick here return {
 * audioElement: audioElement,
 *
 * play: function(filename) { audioElement.src = filename; audioElement.play(); //
 * <-- Thats all you need } }; });
 */
