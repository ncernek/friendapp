'use strict';

var view2Module = angular.module('view2Module', [ 'servicesModule', 'firebase' ]);

view2Module.controller('ScheduleCtrl', ['$scope', '$http', 'firebaseService','$firebase',  function ($scope, $http, firebaseService, $firebase) {
    var fireRef = new Firebase('https://socialsanity.firebaseio.com/');
    var friendsRef = fireRef.child("friends");
    var scheduleRef = fireRef.child("schedule");
    var callsPerWeekRef = fireRef.child("callsPerWeek");


    $scope.friendsRef = $firebase(friendsRef).$asArray();


    //$scope.fireBaseRef = firebaseService;
    $scope.availableOptions = [1,2,3,4,5,6,7,8,9,10];
    $scope.callsPerWeek = 3;

    function updateCallsPerWeekArray() {
        return Array.apply(null, {length: $scope.callsPerWeek}).map(Number.call, Number);
    }

    $scope.scheduleSequence = function() {
        var friends = normalizeArray();
        var callsPerWeek = $scope.callsPerWeek;
        var starsTotal = starsCounter();
        var sequence = arrayMaker();
        var unsortedSequence = sequenceScheduler();
        var sortedSequence = sortPerWeek();

        function normalizeArray(){
            var regularArray = [];
            for (var i = 0; i < $scope.friendsRef.length; i++) {
                regularArray.push($scope.friendsRef[i]);
            }
            return regularArray;
        }

        function starsCounter(){
            var sum = 0;
            for (var friend in friends){
                sum += friends[friend].stars;
            }
            $scope.weeks = Array.apply(null, {length: sum/callsPerWeek}).map(Number.call, Number);
            return sum;
        }

        function arrayMaker(){
            var madearray = Array.apply(null, new Array(starsTotal)).map(Boolean.prototype.valueOf,false);
            return madearray;
        }

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
                            }
                        }
                }
            }
            return sequence;
        }

        function sortPerWeek() {
            var sortedSequence = [];
            var chunk = parseInt($scope.callsPerWeek);
            for (var i=0; i < unsortedSequence.length; i += chunk) {
                var chunkArray = unsortedSequence.slice(i,i + chunk);
                sortedSequence.push(chunkArray);
            }
            return sortedSequence;
        }

        //
        function contactCardMaker() {
            var contactCardArray = [];
            var locale = "en-us";
            for (var i=0; i < sortedSequence.length; i ++) {
                var objDate = new Date(Date.now() + 604800000 * i);
                var month = objDate.toLocaleString(locale, { month: "short" });
                var todayString = month + " " + objDate.getDate();
                contactCardArray.push({
                    date: todayString,
                    contacts: sortedSequence[i]
                    // this dont save to db - dateObj: objDate
                }
                );
            }
            return contactCardArray;
        }

        callsPerWeekRef.set(updateCallsPerWeekArray());
        scheduleRef.set(contactCardMaker());
    };


    //can I put this earlier in the file?
    $scope.scheduleRef = $firebase(scheduleRef).$asArray();
    $scope.callsPerWeekRef = $firebase(callsPerWeekRef).$asArray();
}]);






















