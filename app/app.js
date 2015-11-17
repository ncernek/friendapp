'use strict';

// Declare app level module which depends on views, and components
var friendApp = angular.module('friendApp', [
  'ngRoute',
  'friendApp.view1',
  'friendApp.view2',
  'friendApp.version',
  'controllers',
  'filters'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.
      when('/friends/:friendId', {
        templateUrl: 'friends/friend-detail.html',
        controller: 'FriendDetailCtrl'
      }).
      otherwise({redirectTo: '/view1'});
}]);
