'use strict';

angular.module('friendApp.version', [
  'friendApp.version.interpolate-filter',
  'friendApp.version.version-directive'
])

.value('version', '0.1');
