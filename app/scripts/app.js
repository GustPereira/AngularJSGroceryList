'use strict';

/**
 * @ngdoc overview
 * @name groceriesList
 * @description
 * # groceriesList
 *
 * Main module of the application.
 */
angular
    .module('groceriesList', [
        'ngAnimate',
        'ngAria',
        'ngCookies',
        'ngMessages',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch',
        'as.sortable'
    ])
    .config(function ($routeProvider, $locationProvider, $httpProvider) {

        $httpProvider.defaults.headers.common = {};
        $httpProvider.defaults.headers.post = {};
        $httpProvider.defaults.headers.put = {};
        $httpProvider.defaults.headers.patch = {};

        $routeProvider
            .when('/home', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl',
                controllerAs: 'main',
                resolve: {
                    auth: ["$q", "authentication", function ($q, authentication) {
                        var userInfo = authentication.getUserInfo();
                        if (userInfo) {
                            return $q.when(userInfo);
                        } else {
                            return $q.reject({ authenticated: false });
                        }
                    }]
                }
            })
            .when('/', {
                templateUrl: 'views/login.html',
                controller: 'LoginCtrl',
                controllerAs: 'login',
                menu: true
            })
            .otherwise({
                redirectTo: '/'
            });

        $locationProvider.html5Mode(true);

        $httpProvider.defaults.headers.post = { 'Content-Type' : 'application/json' };
        $httpProvider.defaults.headers.put = { 'Content-Type' : 'application/json' };

    }).run(function ($timeout, $rootScope, $q, authentication, $http, redirect) {

        $rootScope.$pageFinishedLoading = false;

        var whatToWait = [
            window.onload,
            $timeout(2000)
        ];

        $q.all(whatToWait).then(function () {
            $rootScope.$pageFinishedLoading = true;            
        });

        $timeout(function () {
            if (!$rootScope.$pageFinishedLoading) {
                $rootScope.$pageFinishedLoading = true;
            }
        }, 7000);

        $rootScope.$on("$routeChangeSuccess", function () {
            if (authentication.getUserInfo()) {
                $http.defaults.headers.common.Authorization = 'bearer ' + authentication.getUserInfo().accessToken;
            }
        });

        $rootScope.$on("$routeChangeError", function (event, current, previous, eventObj) {
            if (eventObj.authenticated === false) {
                redirect.loginPage();
            }
        });

    });