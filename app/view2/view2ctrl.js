'use strict';

var view2Module = angular.module('view2Module', [ 'servicesModule' ]);

view2Module.controller('ScheduleCtrl', ['$scope', '$http', 'friendsService',  function ($scope, $http, friendsService) {
    $scope.friends = friendsService;
    $scope.availableOptions = [1,2,3,4,5];
    $scope.callsPerWeek = 1;

    $scope.scheduleSequence = function() {
        var friends = normalizeArray();
        var callsPerWeek = $scope.callsPerWeek;
        var starsTotal = starsCounter();
        var sequence = arrayMaker();
        var unsortedSequence = sequenceScheduler();

        function normalizeArray(){
            var regularArray = [];
            for (var i = 0; i < $scope.friends.length; i++) {
                regularArray.push($scope.friends[i]);
            }
            return regularArray;
        }

        function starsCounter(){
            var sum = 0;
            for (var friend in friends){
                sum += friends[friend].stars;
                console.log("stars: ", friends[friend]);
            }
            $scope.weeks = Array.apply(null, {length: sum/callsPerWeek}).map(Number.call, Number);
            return sum;
        }

        function arrayMaker(){
            console.log("starsTotal: ", starsTotal);
            var madearray = Array.apply(null, new Array(starsTotal)).map(Boolean.prototype.valueOf,false);
            //console.log(madearray);
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
        $scope.finalSequence = sortPerWeek();
    };
}]);