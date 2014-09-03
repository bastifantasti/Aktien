'use strict';

/**
 * @ngdoc overview
 * @name aktienApp
 * @description
 * # aktienApp
 *
 * Main module of the application.
 */
angular
  .module('aktienApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
        'firebase','angularCharts'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      }).when('/aktien/:user', {
            templateUrl: 'views/aktien.html',
            controller: 'AktienCtrl'
      })/**
      .otherwise({
        redirectTo: '/'
      })**/;
  });
