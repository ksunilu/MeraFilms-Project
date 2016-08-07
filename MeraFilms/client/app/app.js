'use strict';

angular.module('meraFilmsApp', ['meraFilmsApp.auth', 'meraFilmsApp.admin', 'meraFilmsApp.constants',
    'ngCookies', 'ngResource', 'ngSanitize', 'ngRoute', 'btford.socket-io', 'validation.match'
  ])
  .config(function($routeProvider, $locationProvider) {
    $routeProvider.otherwise({
      redirectTo: '/'
    });

    $locationProvider.html5Mode(true);
  });
