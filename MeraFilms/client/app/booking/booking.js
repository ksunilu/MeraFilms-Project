'use strict';

angular.module('meraFilmsApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/booking/:id', {
        template: '<booking></booking>'
      })
      .when('/book/:id', {
        template: '<booking></booking>'
      })
      ;
  });
