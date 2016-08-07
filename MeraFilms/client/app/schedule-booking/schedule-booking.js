'use strict';

angular.module('meraFilmsApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/schedule-booking', {
        template: '<schedule-booking></schedule-booking>'
      })
      .when('/schedule-movies', {
        template: '<schedule-booking></schedule-booking>'
      })
      .when('/schedule-movie', {
        template: '<schedule-booking></schedule-booking>'
      })
      ;
  });
