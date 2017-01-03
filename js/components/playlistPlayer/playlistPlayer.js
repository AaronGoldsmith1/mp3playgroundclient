angular.module('Mp3Playground')
  .component('playlistPlayer', {
    templateUrl: 'js/components/playlistPlayer/playlistPlayer.html',
    controller: playlistPlayer,
    require: 'ngModel',
    bindings: {
      onRemoveSong: '&',
      songs: '='
    }
  });

playlistPlayer.$inject = ['$http', '$element', '$q', '$scope', 'LastfmRepo']

function playlistPlayer($http, $element, $q, $scope, lastfmRepo){


  var ctrl = this;
  ctrl.currentSong = null;
  var $container = $element.find('div')[0];
  var wavesurfer = WaveSurfer.create({
    container: $container,
    height: 50
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

  ctrl.removeSongFromPlaylist = function(song){
    ctrl.onRemoveSong()(song);
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
    if (ctrl.songs.length) {
      // ctrl.load(ctrl.songs[0]).then(function(song){
      //   console.log("song loaded!", song);
      // });
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
