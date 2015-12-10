'use strict';

var view1Module = angular.module('view1Module', [ 'servicesModule', 'firebase' ]);

view1Module.controller('FriendListCtrl', ['$scope', '$http', 'firebaseService', '$firebase',  function ($scope, $http, firebaseService, $firebase) {
    var fireRef = new Firebase('https://socialsanity.firebaseio.com/');
    var friendsRef = fireRef.child("friends");
    $scope.friendsRef = $firebase(friendsRef).$asArray();
    //$scope.fireBaseRef = firebaseService;

    $scope.editedFriend = null;

    $scope.sortField = '-stars';
    $scope.reverse = true;
    $scope.availableOptions = [1,2,3,4,5];
    $scope.stars = 1;

    $scope.addName = function() {
        if(!$scope.firstName || $scope.firstName === '') { return; }
        var uid = $scope.lastName.concat($scope.firstName);
        friendsRef.child(uid).set({
            firstName:$scope.firstName,
            lastName:$scope.lastName,
            stars:Number($scope.stars),
            dateContacted:$scope.dateContacted,
            id:uid
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
        //I don't think this is useful.
        $scope.originalFriend = angular.extend({}, $scope.editedFriend);
    };

    $scope.doneEditing = function(friend){
        $scope.editedFriend = null;
        var title = friend.firstName.trim();
        if (title) {
            $scope.friendsRef.$save(friend);
        } else {
            $scope.removeFriend(friend);
        }
    };

    $scope.removeFriend = function(friend){
        $scope.friendsRef.$remove(friend);
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
