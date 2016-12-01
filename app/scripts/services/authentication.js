'use strict';

/**
 * @ngdoc service
 * @name groceriesList.authentication
 * @description
 * # authentication
 * Service in the groceriesList.
 */
angular.module('groceriesList')
  .factory("authentication", function($http, $q, $window, $rootScope, baseUrl, redirect) {
  var userInfo;

  function login(userName, password) {
    var deferred = $q.defer();
    $http.post(baseUrl+"/token", 
      "grant_type=password" + "&username=" + encodeURIComponent(userName) + "&password=" + encodeURIComponent(password)
    ).then(function(result) {
      userInfo = {
        accessToken: result.data.access_token,
        userName: result.data.userName
      };
      $window.sessionStorage["userInfo"] = JSON.stringify(userInfo);      
      deferred.resolve(userInfo);
    }, function(error) {
      deferred.reject(error);
    });
    
    return deferred.promise;
  }

  function register(userName, password, confirmPassword) {
    var deferred = $q.defer();
    $http.post(baseUrl+"/api/account/register", { 
      email: userName, 
      password: password, 
      confirmPassword: confirmPassword
    }
    ).then(function(result) {
       login(userName, password);
       deferred.resolve(userInfo);
    }, function(error) {
      deferred.reject(error);
    });
    
    return deferred.promise;
  }

  function getUserInfo() {
    if($window.sessionStorage["userInfo"]){
      userInfo = JSON.parse($window.sessionStorage["userInfo"]);
    }
    return userInfo;
  }

  function logOut(){
    $window.sessionStorage["userInfo"] = "";
    userInfo = "";
    redirect.loginPage();
  }

  function newPassord(item){
    var deferred = $q.defer();
    $http.post(baseUrl+"/api/Account/CreatePassword", item).then(function(result) {       
       deferred.resolve(result);
    }, function(error) {
      deferred.reject(error);
    });
    
    return deferred.promise;
  }

  return {
        login: login,
        register: register,
        getUserInfo: getUserInfo,
        newPassord: newPassord,
        logOut: logOut
    };
});