describe('FriendListCtrl', function(){

  it('should create "friends" model with 3 friends', function() {
    var scope = {},
        ctrl = new FriendListCtrl(scope);

    expect(scope.friends.length).toBe(3);
  });

});
