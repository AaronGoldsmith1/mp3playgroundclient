angular.module('Mp3Playground')
  .component('addSongToPlaylistForm', {
    templateUrl: 'js/components/addSongToPlaylistForm/addSongToPlaylistForm.html',
    controller: addSongToPlaylistForm,
    require: 'ngModel',
    bindings: {
      playlistId: '='
    }
  });

addSongToPlaylistForm.$inject = ['PlaylistsRepo', 'SongsRepo', '$element']

function addSongToPlaylistForm(PlaylistsRepo, SongsRepo, $element){
  var ctrl = this;


  ctrl.addSongToPlaylist = function(song){
    PlaylistsRepo.addSong(ctrl.playlistId, song._id).then(function(res){
      console.log(res.data)
    })
  }

  SongsRepo.get().then(function(res){
    console.log(res.data);
    ctrl.songs = res.data;
  });

}
