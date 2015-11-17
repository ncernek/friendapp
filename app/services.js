var services = angular.module('services', ['ngResource']);

services.factory('Friend', ['$resource',
  function($resource){
    return $resource('friends/:friendId.json', {}, {
      query: {method:'GET', params:{friendId:'friends'}, isArray:true}
    });
  }]);

  services.factory('f', function() {
    var myService = {
      someData: ''
    };
    return myService;
  });
