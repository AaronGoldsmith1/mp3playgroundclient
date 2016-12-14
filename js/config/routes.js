(function() {
  'use strict';

  angular.module('Mp3Playground')
    .config(MainRouter);

  MainRouter.$inject = ['$stateProvider', '$urlRouterProvider'];

  function MainRouter($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'js/templates/home.html'
      })
      .state('about', {
        url: '/about',
        templateUrl: 'about.html'
      })
      .state('songs', {
        url: '/songs',
        templateUrl: 'js/templates/songs.html'
      })
      .state('signin', {
        url: '/signin',
        templateUrl: 'signin.html',
        controller: 'SignInController',
        controllerAs: 'vm'
      });


  }
}());
