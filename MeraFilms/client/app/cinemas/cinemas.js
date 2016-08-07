'use strict';

angular.module('meraFilmsApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/cinemas', {
        template: '<cinemas></cinemas>'
      })
      .when('/theaters', {
        template: '<cinemas></cinemas>'
      })
      .when('/cineplex', {
        template: '<cinemas></cinemas>'
      });
  });
