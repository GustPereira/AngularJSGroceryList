'use strict';

/**
 * @ngdoc function
 * @name groceriesList.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the groceriesList
 */
angular.module('groceriesList')
  .controller('MainCtrl', function ($scope, groceries, colors, authentication) {

    $scope.userName = authentication.getUserInfo().userName;

    groceries.get().then(function (result) {
      if (result && result.data.length > 0) {
        $scope.itemList = result.data;
      } else {
        $scope.itemList = [{ index: 0, text: "", color: 0, check: false }];
      }
    });

    $scope.colors = colors;

    $scope.addNewItem = function () {
      var newItem = { index: $scope.itemList.length + 1, text: "", color: 0, check: false };
      $scope.itemList.push(newItem);
    };

    $scope.removesItem = function (item) {
      item.loading = true;
      var index = $scope.itemList.indexOf(item);
      if (item.id) {
        groceries.remove(item.id).then(function () {
          $scope.itemList.splice(index, 1);
        }, function(){
          item.loading = false;
        });
      }else{
        $scope.itemList.splice(index, 1);
      }
      
    };

    $scope.changed = function (item) {
      var index = $scope.itemList.indexOf(item);
      if (item.id) {
        groceries.put(item);
      } else {
        groceries.post(item).then(function (result) {
          $scope.itemList[index] = result.data;
        });
      }
    };

    $scope.colorItem = function(item) {
      item.color++;  
      if(colors.length === item.color){
        item.color = 0;
      }
      groceries.put(item);  
    };

    $scope.checkItem = function(item) {
      item.check = !item.check;        
      groceries.put(item);  
    };

    $scope.dragControlListeners = {
        containment: '#groceries-content',
        clone: false,
        itemMoved: function (event) {
            var moveSuccess, moveFailure;
            moveSuccess = function() {};
            moveFailure = function(eventObj) {   
                eventObj.dest.sortableScope.removeItem(eventObj.dest.index);
                eventObj.source.itemScope.sortableScope.insertItem(eventObj.source.index, eventObj.source.itemScope.item);
            };
        },
        orderChanged: function (event) {

            var list = [];
            var i = 0;
            $scope.itemList.forEach(function (item) {
              
              list.push({ id:item.id, index: i });
              i++;
              
            });
            groceries.putIndex(list);
            },  
    };

    $scope.logOut = function(){
      authentication.logOut();
    };


  });
