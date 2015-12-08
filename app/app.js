'use strict';

// Declare app level module which depends on views, and components
var friendApp = angular.module('friendApp', [
    'ngRoute',
    'ui.router',
    'friendApp.view1',
    'friendApp.view2',
    'friendApp.version',
    'view1Module',
    'view2Module',
    'firebase'
]);

//friendApp.config(['$routeProvider', function ($routeProvider) {
//    $routeProvider.
//    when('/friends/:friendId', {
//        templateUrl: 'friends/friend-detail.html',
//        controller: 'FriendDetailCtrl'
//    }).
//    otherwise({redirectTo: '/view1'});
//}]);
friendApp.config([
    '$stateProvider',
    '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
        $stateProvider.state('view1', {
                url: '/view1',
                templateUrl: 'view1/view1.html',
                controller: 'view1Ctrl'
            });
        //$stateProvider.state('posts', {
        //    url: '/posts/{id}',
        //    templateUrl: '/posts.html',
        //    controller: 'PostsCtrl'
        //});

        $urlRouterProvider.otherwise('view1');
    }]);
