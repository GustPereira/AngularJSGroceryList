'use strict';

/**
 * @ngdoc directive
 * @name groceriesList.directive:zoomIn
 * @description
 * # zoomIn
 */
angular.module('groceriesList')
  .directive('zoomIn', ['$timeout', '$rootScope' ,function ($timeout, $rootScope) {
    return {
      restrict: 'A',
      link: function ($scope, elem) {
        elem.addClass('full-invisible');
        var delay = 1200;

        if ($rootScope.$pageFinishedLoading) {
          delay = 100;
        }

        $timeout(function () {
          elem.removeClass('full-invisible');
          elem.addClass('animated zoomIn');
        }, delay);
      }
    };
  }]);