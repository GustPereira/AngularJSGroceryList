'use strict';

/**
 * @ngdoc service
 * @name groceriesList.groceries
 * @description
 * # groceries
 * Service in the groceriesList.
 */
angular.module('groceriesList')
  .service('groceries', function ($q, $http, authentication, $rootScope, baseUrl) {

    var url = baseUrl + "/api/groceries";

    function post(item) {
      var deferred = $q.defer();
      $http.post(url, item).then(function (result) {
        deferred.resolve(result);
      }, function (error) {
        deferred.reject(error);
      });

      return deferred.promise;
    }

    function put(item) {
      var deferred = $q.defer();
      $http.put(url + "/" + item.id, item).then(function (result) {
        deferred.resolve(result);
      }, function (error) {
        deferred.reject(error);
      });

      return deferred.promise;
    }

    function putIndex(item) {
      var deferred = $q.defer();
      $http.put(url + "/index", item).then(function (result) {
        deferred.resolve(result);
      }, function (error) {
        deferred.reject(error);
      });

      return deferred.promise;
    }

    function get() {

      var deferred = $q.defer();
      $http.get(url).then(function (result) {
        deferred.resolve(result);
      }, function (error) {
        deferred.reject(error);
      });

      return deferred.promise;
    }

    function remove(id) {

      var deferred = $q.defer();
      $http.delete(url + "/" + id).then(function (result) {
        deferred.resolve(result);
      }, function (error) {
        deferred.reject(error);
      });

      return deferred.promise;
    }

    return {
      post: post,
      put: put,
      putIndex: putIndex,
      get: get,
      remove: remove
    };
  });
