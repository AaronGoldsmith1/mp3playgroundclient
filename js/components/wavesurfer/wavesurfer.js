(function () {
  'use strict';
  angular.module('mdWavesurferApp', ['mdWavesurfer'])
    .config(function ($mdIconProvider) {
      //$mdIconProvider.fontSet('zmdi', 'fontawesome');
    })
    .controller('MainController', ['$scope',
      function ($scope) {
        $scope.urls = ["../media/demo.wav", "../panner/media.wav", "../elan/transcripts/001z.mp3"];
        $scope.longList = [];
        for (var i = 0; i < 100; i++) {
          $scope.longList.push({
            title: 'Long List test: ' + i,
            url: $scope.urls[Math.floor(3 * Math.random())]
          });
        }
      }]


var wavesurfer = WaveSurfer.create({
    container: '#waveform',
    scrollParent: true
});

wavesurfer.load('http://ia902606.us.archive.org/35/items/shortpoetry_047_librivox/song_cjrg_teasdale_64kb.mp3');
