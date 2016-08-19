'use strict';

angular.module('meraFilmsApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/trailers', {
        template: '<trailers></trailers>'
      });
  });
