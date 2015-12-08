var servicesModule = angular.module('servicesModule', ['firebase']);

servicesModule.factory('friendsService', ['$firebase',
  function($firebase){
    var fireRef = new Firebase('https://socialsanity.firebaseio.com/');
      return $firebase(fireRef).$asArray();
  }]);

