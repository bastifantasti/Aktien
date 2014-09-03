'use strict';

/**
 * @ngdoc function
 * @name aktienApp.controller:NavigatorCtrl
 * @description
 * # NavigatorCtrl
 * Controller of the aktienApp
 */
angular.module('aktienApp')
  .controller('NavigatorCtrl', function ($scope,userservice) {

        $scope.loggedIn = userservice.isLoggedIn();
    $scope.logout = function(){
        userservice.logOut();
        console.log("logout")
    };
        var updateUser = function(){
            $scope.loggedIn = userservice.isLoggedIn();
            $scope.user = userservice.getUser();
        };

        userservice.registerObserverCallback(updateUser);

  });
