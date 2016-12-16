angular.module('Mp3Playground')
  .component('playlistPlayer', {
    templateUrl: 'js/components/playlistPlayer/playlistPlayer.html',
    controller: playlistPlayer,
    require: 'ngModel',
    bindings: {
      songs: '='
    }
  });

playlistPlayer.$inject = ['$http', '$element']

function playlistPlayer($http, $element){
  var ctrl = this;
  var $container = $element.find('div')[0];
  var wavesurfer = WaveSurfer.create({
    container: $container,
    height: 10
  });


  ctrl.playSong = function(song){
    wavesurfer.load(song.url);
    wavesurfer.on('ready', function(){
      wavesurfer.play();
    });
  }

  ctrl.toggleMute = function(){
    wavesurfer.toggleMute();
  }

  ctrl.pause = function(){
    wavesurfer.pause();
  }

}
