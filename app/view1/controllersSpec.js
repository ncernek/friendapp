describe('FriendListCtrl', function(){

  beforeEach(module('friendApp'));

  it('should create "friends" model with 3 friends', inject(function($controller) {
    var scope = {},
        ctrl = $controller('FriendListCtrl', {$scope:scope});

    expect(scope.friends.length).toBe(3);
    //expect(scope.name).toBe('Fatima');

    it('should set the default value of orderProp model', function() {
      expect(scope.orderProp).toBe('-importance');
    });
  }));

});

//for some reason the test file must be in the path of the module it is calling
