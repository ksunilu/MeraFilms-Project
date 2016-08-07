'use strict';

angular.module('meraFilmsApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/seat', {
        template: '<seat></seat>'
      })
      ;
  });
