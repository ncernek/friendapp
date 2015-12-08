'use strict';

var view1Module = angular.module('view1Module', [ 'servicesModule' ]);

view1Module.controller('FriendListCtrl', ['$scope', '$http', 'friendsService',  function ($scope, $http, friendsService) {
    $scope.friends = friendsService;
    $scope.editedFriend = null;

    $scope.sortField = '-stars';
    $scope.reverse = true;
    $scope.availableOptions = [1,2,3,4,5];
    $scope.stars = 1;

    $scope.addName = function() {
        if(!$scope.firstName || $scope.firstName === '') { return; }
        $scope.friends.$add({
            firstName:$scope.firstName,
            lastName:$scope.lastName,
            stars:Number($scope.stars),
            dateContacted:$scope.dateContacted,
            id:$scope.lastName.concat($scope.firstName)
        });
        $scope.firstName = '';
        $scope.lastName = '';
        //$scope.friends = data;
        $scope.stars = '';
        $scope.dateContacted = '';
        $scope.id = '';
    };


    $scope.editFriend = function(friend){
        $scope.editedFriend = friend;
        $scope.originalFriend = angular.extend({}, $scope.editedFriend);
    };

    $scope.doneEditing = function(friend){
        $scope.editedFriend = null;
        var title = friend.firstName.trim();
        if (title) {
            $scope.friends.$save(friend);
        } else {
            $scope.removeFriend(friend);
        }
    };

    $scope.removeFriend = function(friend){
        $scope.friends.$remove(friend);
    };

    $scope.incrementStarsUp = function(friend) {
        if(friend.stars === 5) { return; }
        friend.stars += 1;
    };

    $scope.incrementStarsDown = function(friend) {
        if(friend.stars === 1) { return; }
        friend.stars -= 1;
    };
}]);
