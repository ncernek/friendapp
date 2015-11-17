'use strict';


// Declare app level module which depends on views, and components
var controllers = angular.module('controllers', []);

controllers.controller('FriendListCtrl', ['$scope', '$http', function ($scope, $http) {
    $http.get('friends/friends.json').success(function(data) {
        $scope.friends = data;
      });
  $scope.sortField = '-importance';
  $scope.reverse = true;
  $scope.availableOptions = [1,2,3,4,5,6,7,8,9,10];

  $scope.addName = function() {
    var newFriend = {};
    newFriend.firstName = $scope.firstName;
    newFriend.lastName = $scope.lastName;
    newFriend.importance = Number($scope.importance);
    newFriend.dateContacted = $scope.dateContacted;
    newFriend.id = $scope.lastName.concat($scope.firstName);
    $scope.friends.push(newFriend);
    $scope.firstName = '';
    $scope.lastName = '';
    $scope.importance = '';
    $scope.dateContacted = '';
    $scope.id = '';
  };

  $scope.save = function() {
    $http.post('friends/newfriends.json', $scope.friends).then(function(data) {
      $scope.msg = 'Data saved';
    });
  };

  $scope.scheduleSequence = function() {
  	var friends = $scope.friends;
    	var importanceTotal = importanceCounter();
    	var sequence = arrayMaker();

      function importanceCounter(){
          var sum = 0;
          for (var friend in friends)
              sum += friends[friend].importance;
          $scope.weeks = Array.apply(null, {length: sum}).map(Number.call, Number);
          return sum;
      };

      function arrayMaker(){
        var sequence = Array.apply(null, Array(importanceTotal)).map(Boolean.prototype.valueOf,false);
        return sequence;
      };

      function sequenceScheduler() {
        	for (var friend in friends) {
              var placed = false;
              var frequency = Math.ceil(importanceTotal / friends[friend].importance);
              for (var i = 0; i < importanceTotal; i += frequency) {
                  placed = false;
                  if (sequence[i] == false) {
                      sequence[i] = friends[friend].id;
                  }
                  else if (sequence[i - 1] == false) {
                      sequence[i - 1] = friends[friend].id;
                  }
                  else
                      while (placed == false && i <= importanceTotal) {
                          i++;
                          if (sequence[i] == false) {
                              sequence[i] = friends[friend].id;
                              placed = true;
                          };
                      };
               };
          };
  		return sequence;
      };
    	$scope.sequenceScheduler = sequenceScheduler();
  };

}]);

controllers.controller('FriendDetailCtrl', ['$scope', '$routeParams', '$http',
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
