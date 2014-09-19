'use strict';

/**
 * @ngdoc service
 * @name aktienApp.user
 * @description
 * # user
 * Service in the aktienApp.
 */
angular.module('aktienApp')
  .service('userservice', function userservice($location,$firebase,$rootScope) {
    // AngularJS will instantiate a singleton by calling "new" on this function
        var user = false;
        var ref = new Firebase("https://aktien.firebaseio.com");

        var authClient = new FirebaseSimpleLogin(ref, function(error, user) {
            if (error) {
                // an error occurred while attempting login
                logOut();
                console.log(error);
            } else if (user) {
                console.log("User IDs: " + user.uid + ", Provider: " + user.provider);
                console.log(user);
                console.log("path: "+$location.path());
                setUser(user);
                //md5_hash
                $location.path("/aktien/"+user.md5_hash);
                $rootScope.$apply();
               // $scope.$apply();
                //window.location('/depot/'+user.md5_hash);
            } else {
                logOut();
                notifyObservers();
            }
        });

        var getUser = function(){
          return user;
        };

        var setUser = function(obj){
            user = obj;
            notifyObservers();
        };
        var isLoggedIn = function(){
            if(!user){
                return false;
            }else{
                return true;
            }
        };
        var logOut = function(){
            user = false;
            $location.path("/");
            authClient.logout();
            notifyObservers();
        };

        var observerCallbacks = [];

        //register an observer
        var registerObserverCallback = function(callback){
            observerCallbacks.push(callback);
        };

        //call this when you know 'foo' has been changed
        var notifyObservers = function(){
            angular.forEach(observerCallbacks, function(callback){
                callback();
            });
        };

        //example of when you may want to notify observers


        return {
            isLoggedIn: isLoggedIn,
            getUser:getUser,
            setUser:setUser,
            logOut:logOut,
            registerObserverCallback:registerObserverCallback,
            notifyObservers:notifyObservers,
            authClient: authClient,
            ref: ref

        };
  });
