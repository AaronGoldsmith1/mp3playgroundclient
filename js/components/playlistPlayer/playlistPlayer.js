angular.module('Mp3Playground')
  .component('playlistPlayer', {
    templateUrl: 'js/components/playlistPlayer/playlistPlayer.html',
    controller: playlistPlayer,
    require: 'ngModel',
    bindings: {
      songs: '='
    }
  });

playlistPlayer.$inject = ['$http', '$element', '$scope', '$q']

function playlistPlayer($http, $element, $scope, $q){


  var ctrl = this;
  $scope.songs = ctrl.songs;
  ctrl.currentSong = null;
  var $container = $element.find('div')[0];
  var wavesurfer = WaveSurfer.create({
    container: $container,
    height: 50
  });


  ctrl.playSong = function(song){
    if (ctrl.currentSong == song) {
      wavesurfer.seekTo(0)
      wavesurfer.play()
    } else {
      ctrl.load(song)
          .then(function(song){
            wavesurfer.play()
          })
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

  ctrl.clearSong = function(){
    wavesurfer.empty()
    ctrl.currentSong = null;
  }

  ctrl.nextSong = function(){
    currentSongIndex = _.indexOf($scope.songs, ctrl.currentSong); // returns -1 if not found
    if (currentSongIndex < 0){
      // No song is playing, do nothing
      return
    }
    targetSongIndex = currentSongIndex + 1;
    if (targetSongIndex < $scope.songs.length) {
      ctrl.playSong($scope.songs[targetSongIndex])
    } else {
      ctrl.clearSong()
    }
  }

  ctrl.prevSong = function(){
    currentSongIndex = _.indexOf($scope.songs, ctrl.currentSong)
      if (currentSongIndex < 0){
        return
      }
      targetSongIndex = currentSongIndex - 1
      if (targetSongIndex >= 0){
        ctrl.playSong($scope.songs[targetSongIndex])
      } else {
        ctrl.clearSong()
      }
    }

  ctrl.initListeners = function(){
    var throttledSecondsToMinutes = _.throttle(function(){
      var wholeSeconds = Math.floor(wavesurfer.getCurrentTime());
      ctrl.progress = hhmmss(wholeSeconds);

      // Since this is not 'in' angular and it doesn't know about this update
      // We'll manually tell Angular there's  a change only if it's not already updating
      if($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest'){
        $scope.$apply();
      }

    }, 1000);

    wavesurfer.on('audioprocess', function() {
      // Call a 'throttled' function because this called constantnly
      throttledSecondsToMinutes();
    });
  }

  ctrl.load = function(song){
    ctrl.currentSong = null;
    var deferred = $q.defer();
    wavesurfer.load(song.url);
    wavesurfer.on('ready', function(){
      song.duration = moment().startOf('day')
          .seconds(wavesurfer.getDuration())
          .format('H:mm:ss');
      ctrl.currentSong = song;
      deferred.resolve(song);
      wavesurfer.un('ready')
    });
    return deferred.promise
  }
  ctrl.init = function(){
    ctrl.initListeners()
    if ($scope.songs.length) {
      ctrl.load($scope.songs[0]).then(function(song){
        console.log("song loaded!", song);
      });
    }
  }
  ctrl.init();

  function pad(num) {
    return ("0"+num).slice(-2);
  }
  function hhmmss(secs) {
    var minutes = Math.floor(secs / 60);
    secs = secs%60;
    var hours = Math.floor(minutes/60)
    minutes = minutes%60;
    return pad(hours)+":"+pad(minutes)+":"+pad(secs);
  }

}
