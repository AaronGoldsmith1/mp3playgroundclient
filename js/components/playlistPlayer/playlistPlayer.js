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
  ctrl.currentSong = null;
  var $container = $element.find('div')[0];
  var wavesurfer = WaveSurfer.create({
    container: $container,
    height: 10
  });


  ctrl.playSong = function(song){
    if (ctrl.currentSong == song) {
      wavesurfer.seekTo(0)
      wavesurfer.play()
    } else {
    wavesurfer.load(song.url);
    wavesurfer.on('ready', function(){
      ctrl.currentSong = song
      wavesurfer.play();
      });
    }
  }

  ctrl.playPause = function(){
    wavesurfer.playPause();
  }

  ctrl.skipBackward = function(){
    wavesurfer.skipBackward();
  }

  ctrl.skipForward = function() {
    wavesurfer.skipForward();
  }

  ctrl.toggleMute = function(){
    wavesurfer.toggleMute();
  }

  ctrl.pause = function(){
    wavesurfer.pause();
  }

  ctrl.nextSong = function(){

    targetSong = _.indexOf(ctrl.songs, ctrl.currentSong)

    if (targetSong < 0){
      return
    }

    targetSong++
    // Get the index of current in ctrl.songs

    //Get the song at the next index
    if (targetSong < ctrl.songs.length) {
      ctrl.playSong(ctrl.songs[targetSong])
    }
    // if there is a song at the next index

    //call ctrl.playSong on it
  }

  ctrl.prevSong = function(){

  }

}
