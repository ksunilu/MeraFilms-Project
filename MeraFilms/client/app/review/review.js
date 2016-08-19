'use strict';

angular.module('meraFilmsApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/review', {
        template: '<review></review>'
      });
  });
