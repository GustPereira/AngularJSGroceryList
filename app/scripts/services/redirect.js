'use strict';

/**
 * @ngdoc service
 * @name groceriesList.redirect
 * @description
 * # redirect
 * Service in the groceriesList.
 */
angular.module('groceriesList')
  .factory('redirect', ['$injector', function ($injector) {

    function loginPage() {
      var $location;
      $location = $location || $injector.get('$location');

      $location.path("/");
    }

    function homePage() {
      var $location;
      $location = $location || $injector.get('$location');

      $location.path("/home");
    }

    return {
      loginPage: loginPage,
      homePage: homePage
    };
  }]);