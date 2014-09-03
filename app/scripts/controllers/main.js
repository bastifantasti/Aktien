'use strict';

/**
 * @ngdoc function
 * @name aktienApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the aktienApp
 */
angular.module('aktienApp')
    .controller('MainCtrl', function ($scope,$firebase,$location,userservice) {



        $scope.user = {};
        $scope.login = function(){
            userservice.authClient.login('password', {
                email: $scope.user.email,
                password: $scope.user.pw,
                rememberMe: $scope.user.remember
            });
        };
        if(userservice.isLoggedIn()){
         //   userservice.authClient.login('password');
        };




    });
