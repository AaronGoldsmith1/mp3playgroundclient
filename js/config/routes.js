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
        templateUrl: 'js/templates/signin.html',
      })
      .state('playlists', {
        url: '/playlists',
        templateUrl: 'js/templates/playlists.html'
      })
      .state('playlist', {
        url: '/playlists/:id',
        templateUrl: 'js/templates/playlistSingle.html'
      })


  }
}());
