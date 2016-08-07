'use strict';

angular.module('meraFilmsApp.auth', ['meraFilmsApp.constants', 'meraFilmsApp.util', 'ngCookies',
    'ngRoute'
  ])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
