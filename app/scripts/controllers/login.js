'use strict';

/**
 * @ngdoc function
 * @name groceriesList.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the groceriesList
 */
angular.module('groceriesList')
  .controller('LoginCtrl', function (authentication, redirect, $scope, $timeout) {
    
    $scope.newAccount = false;
    $scope.forgotPassword = false;

    $scope.user = { email: '', password: '' };

    if(authentication.getUserInfo()){
      redirect.homePage();
    }

    $scope.loginUser = function() {
      authentication.login($scope.user.email, $scope.user.password).then(function () {
          redirect.homePage();
      }, function(error){
          $('.errorMessage').removeClass("full-invisible").addClass("slideInDown");
          $scope.error = error.data.error_description;
          $timeout(function(){
            $('.errorMessage').addClass("slideOutUp");            
          }, 3000);
      });
    };

    $scope.registerUser = function() {
      authentication.register($scope.user.email, $scope.user.password, $scope.user.confirmPassword).then(function () {
        $scope.loginUser();
      }, function(error){
          $('.errorMessage').removeClass("full-invisible").removeClass("slideOutUp").addClass("slideInDown");
          
          if(error.data.modelState["model.ConfirmPassword"]){
            $scope.error = error.data.modelState["model.ConfirmPassword"][0];
          }

          if(error.data.modelState["model.Password"]){
            $scope.error = error.data.modelState["model.Password"][0];
          }
          
          if(error.data.modelState[""]){
            $scope.error = error.data.modelState[""][1];
          }

          $timeout(function(){
            $('.errorMessage').removeClass("slideInDown").addClass("slideOutUp");            
          }, 3000);
      });
    };

    $scope.account = function() {
      $scope.newAccount = !$scope.newAccount;
    };

    $scope.password = function() {
      $scope.forgotPassword = !$scope.forgotPassword;
    };

    $scope.newPassword = function(){
      authentication.newPassord($scope.user).then(function(){
        authentication.login($scope.user.email, $scope.user.password).then(function(){
          redirect.homePage();
        });
        
      });
      
    };
        
  });
