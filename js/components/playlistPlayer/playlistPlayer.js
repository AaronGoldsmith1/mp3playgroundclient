angular.module('Mp3Playground')
  .component('playlistPlayer', {
    templateUrl: 'js/components/playlistPlayer/playlistPlayer.html',
    controller: playlistPlayer,
    require: 'ngModel',
    bindings: {
      onRemoveSong: '&',
      playlistTitle: '=',
      songs: '='
    }
  });

playlistPlayer.$inject = ['$http', '$element', '$q', '$scope', 'LastfmRepo']

function playlistPlayer($http, $element, $q, $scope, lastfmRepo){


  var ctrl = this;
  ctrl.currentSong = null;

  var wavesurfer = WaveSurfer.create({
    container: "#wavesurfer-container",
    height: 50,
  });

  ctrl.$onDestroy = function() {
    wavesurfer.destroy()
  }

  ctrl.playSong = function(song){
    if (ctrl.currentSong == song) {
      wavesurfer.seekTo(0)
      wavesurfer.play()
    } else {
      lastfmRepo.getSimilar(song.artist, song.title).then(function(res){
        ctrl.similarTracks = res.data.similartracks.track
      })
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

  ctrl.isPlaying = function(){
    return wavesurfer.isPlaying();
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
    currentSongIndex = _.indexOf(ctrl.songs, ctrl.currentSong); // returns -1 if not found
    if (currentSongIndex < 0){
      // No song is playing, do nothing
      return
    }
    targetSongIndex = currentSongIndex + 1;
    if (targetSongIndex < ctrl.songs.length) {
      ctrl.playSong(ctrl.songs[targetSongIndex])
    } else {
      ctrl.clearSong()
    }
  }

  ctrl.prevSong = function(){
    currentSongIndex = _.indexOf(ctrl.songs, ctrl.currentSong)
      if (currentSongIndex < 0){
        return
      }
      targetSongIndex = currentSongIndex - 1
      if (targetSongIndex >= 0){
        ctrl.playSong(ctrl.songs[targetSongIndex])
      } else {
        ctrl.clearSong()
      }
    }


  ctrl.initListeners = function(){
    var throttledSecondsToMinutes = _.throttle(function(){
      var wholeSeconds = Math.floor(wavesurfer.getCurrentTime());
      ctrl.progress = hhmmss(wholeSeconds); //rendered with angular

      // Since this is not 'in' angular and it doesn't know about this update
      // We'll manually tell Angular there's  a change only if it's not already updating
      if($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest'){
        $scope.$apply();
      }

    }, 1000);

    wavesurfer.on('audioprocess', function() {
      // Call a 'throttled' function because audioprocess called constantnly
      throttledSecondsToMinutes();
    });
  }


  ctrl.removeSongFromPlaylist = function(song){
    ctrl.onRemoveSong()(song);
  }

//loads up song that's in active playlist
  ctrl.load = function(song){
    ctrl.currentSong = null;
    var deferred = $q.defer(); //deferred promise
    wavesurfer.load(song.url);
    wavesurfer.on('ready', function(){
      song.duration = moment().startOf('day')
          .seconds(wavesurfer.getDuration())
          .format('mm:ss');
      ctrl.currentSong = song;
      deferred.resolve(song);
      wavesurfer.un('ready')
    });
    return deferred.promise //object with methods that are called with 'resolve'
  }
  ctrl.init = function(){
    ctrl.initListeners()
    if (ctrl.songs.length) {
    }
  }
  ctrl.init();

  function pad(num) {
    return ("0"+num).slice(-2);
  }
  function hhmmss(secs) {
    var minutes = Math.floor(secs / 60);
    secs = secs%60;

    minutes = minutes%60;
    return pad(minutes)+":"+pad(secs);
  }

  ctrl.setOrderProperty = function(property){
    //debugger
    if (_.endsWith(ctrl.orderProperty, property)){
      if (ctrl.orderProperty.charAt(0) == '-'){
        ctrl.orderProperty = _.trimStart(ctrl.orderProperty, '-');
      }else{
        ctrl.orderProperty = '-' + property
      }
    } else {
      ctrl.orderProperty = property
    }
  }
}
