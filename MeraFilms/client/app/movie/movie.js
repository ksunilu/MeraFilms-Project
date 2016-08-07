'use strict';

angular.module('meraFilmsApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/movie', {
        template: '<movie></movie>'
      })
      .when('/movies', {
        template: '<movie></movie>'
      })
      ;
  });
