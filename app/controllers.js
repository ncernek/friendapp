'use strict';


// Declare app level module which depends on views, and components
var controllers = angular.module('controllers', []);

controllers.controller('FriendListCtrl', ['$scope', '$http', function ($scope, $http) {
    $http.get('friends/friends.json').success(function(data) {
        $scope.friends = data;
      });
  $scope.sortField = '-stars';
  $scope.reverse = true;
  $scope.availableOptions = [1,2,3,4,5];
  $scope.callsPerWeek = 1;


  $scope.addName = function() {
    var newFriend = {};
    newFriend.firstName = $scope.firstName;
    newFriend.lastName = $scope.lastName;
    newFriend.stars = Number($scope.stars);
    newFriend.dateContacted = $scope.dateContacted;
    newFriend.id = $scope.lastName.concat($scope.firstName);
    $scope.friends.push(newFriend);
    $scope.firstName = '';
    $scope.lastName = '';
    $scope.stars = '';
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
    var callsPerWeek = $scope.callsPerWeek;
    var starsTotal = starsCounter();
    var sequence = arrayMaker();
    var unsortedSequence = sequenceScheduler();

      function starsCounter(){
          var sum = 0;
          for (var friend in friends)
              sum += friends[friend].stars;
          $scope.weeks = Array.apply(null, {length: sum/callsPerWeek}).map(Number.call, Number);
          return sum;
      };

      function arrayMaker(){
        var sequence = Array.apply(null, Array(starsTotal)).map(Boolean.prototype.valueOf,false);
        return sequence;
      };

      function sequenceScheduler() {
        	for (var friend in friends) {
              var placed = false;
              var frequency = Math.ceil(starsTotal / friends[friend].stars);
              for (var i = 0; i < starsTotal; i += frequency) {
                  placed = false;
                  if (sequence[i] == false) {
                      sequence[i] = friends[friend].id;
                  }
                  else if (sequence[i - 1] == false) {
                      sequence[i - 1] = friends[friend].id;
                  }
                  else
                      while (placed == false && i <= starsTotal) {
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

      function sortPerWeek() {
          var sortedSequence = [];
          var chunk = parseInt($scope.callsPerWeek);
          for (var i=0; i < unsortedSequence.length; i += chunk) {
              var chunkArray = unsortedSequence.slice(i,i + chunk);
              sortedSequence.push(chunkArray);
          };
          return sortedSequence;
      };
    $scope.finalSequence = sortPerWeek();
  };

}]);
