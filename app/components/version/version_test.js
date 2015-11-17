'use strict';

describe('friendApp.version module', function() {
  beforeEach(module('friendApp.version'));

  describe('version service', function() {
    it('should return current version', inject(function(version) {
      expect(version).toEqual('0.1');
    }));
  });
});
