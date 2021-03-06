/* File: HistoryBrowser.js
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
/*global cnedApp, $:false */
/*jshint unused: false, undef:false */

/* Directive for detecting the document refresh*/
cnedApp.directive('historyBrowser', function ($rootScope, configuration, UtilsService, $location, $log) {
    return {
        restrict: 'EA',
        link: function (scope, element) {
            $(window).bind('beforeunload', function () {

                if (localStorage.getItem('lockOperationDropBox') === 'true') {

                    if (window.location.href.indexOf('/addDocument') > -1) {
                        return 'Vous risquez de perdre les dernières modifications apportées au document. Veuillez vous assurer de l\'enregistrement de votre document avant de quitter cette page';
                    }
                }
            });
            $rootScope.$on('$locationChangeStart', function (event, next, current) {
                var goTo = next.substring(next.lastIndexOf('/'), next.length);


                if (localStorage.getItem('lockOperationDropBox') === 'true') {
                    event.preventDefault();

                    var modalTitle = 'INFORMATION';
                    var modalMessage = '';
                    if (current.indexOf('/workspace') > 0) {
                        //modalMessage = 'Êtes-vous sûr de vouloir quitter l\'espace de structuration ?';

                        $rootScope.$broadcast('actionAvantFermer', {nextUrl: next});


                        if (next.indexOf('#/apercu') > -1) {
                            localStorage.setItem('reloadRequired', true);
                        }

                    } else {
                        modalMessage = 'Vous risquez de perdre le document en cours d\'enregistrement, êtes-vous sûr de vouloir quitter cette page ?';


                        UtilsService.openConfirmModal('INFORMATION', modalMessage, true)
                            .then(function () {
                                localStorage.setItem('lockOperationDropBox', false);
                                $location.path(goTo);
                            });

                    }
                    //prevent the redirection event
                }
            });
        }
    };
});
