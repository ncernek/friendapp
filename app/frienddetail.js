'use strict';


// Declare app level module which depends on views, and components

var friendDetail = angular.module('friendDetail', []);

friendDetail.controller('FriendDetailCtrl', ['$scope', '$routeParams', '$http',
  function($scope, $routeParams, $http) {
      $http.get('friends/' + $routeParams.friendId + '.json').success(function(data) {
      $scope.friend = data;
    });
    // To construct the URL for the HTTP request, we use $routeParams.phoneId extracted from the current route by the $route service.
    $scope.friendId = $routeParams.friendId;
    $scope.hello = function() {
    alert('Hello ' + $scope.friend.firstName + '!');
}
  }]);
