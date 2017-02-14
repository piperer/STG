//'use strict';
//
////Setting up route
//angular.module('mean').config(['$stateProvider',
//    function($stateProvider) {
//        // Check if the user is connected
//        var checkLoggedin = function($q, $timeout, $http, $location) {
//            // Initialize a new promise
//            var deferred = $q.defer();
//
//            // Make an AJAX call to check if the user is logged in
//            $http.get('/loggedin').success(function(user) {
//                // Authenticated
//                if (user !== '0') $timeout(deferred.resolve);
//
//                // Not Authenticated
//                else {
//                    $timeout(deferred.reject);
//                    $location.url('/login');
//                }
//            });
//
//            return deferred.promise;
//        };
//      
//      
//    $stateProvider
//      .state('bootstrapmagic editor page', {
//        url: '/editor',
//        templateUrl: 'bootstrapmagic/views/editor.html'
//      })
////      .state('view version', {
////        url: '/editor/:versionId',
////        templateUrl: 'bootstrapmagic/views/editor.html'
////      })
//      
//      .state('all versions', {
//                url: '/versions',
//                templateUrl: 'bootstrapmagic/views/list.html',
//                resolve: {
//                    loggedin: checkLoggedin
//                }
//            })
//            .state('create version', {
//                url: '/versions/create',
//                templateUrl: 'bootstrapmagic/views/create.html',
//                resolve: {
//                    loggedin: checkLoggedin
//                }
//            })
//            .state('edit versions', {
//                url: '/versions/:versionId/edit',
//                templateUrl: 'bootstrapmagic/views/edit.html',
//                resolve: {
//                    loggedin: checkLoggedin
//                }
//            })
//            .state('version by id', {
//                url: '/versions/:versionId',
//                templateUrl: 'bootstrapmagic/views/editor.html',
//              
//            })
//           
//  }
//])
