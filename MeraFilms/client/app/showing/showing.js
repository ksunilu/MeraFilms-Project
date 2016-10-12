'use strict';

angular.module('meraFilmsApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/showing/:imdbID', {
        template: '<showing></showing>'
      });
  });
