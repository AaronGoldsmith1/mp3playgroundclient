angular.module('Mp3Playground')
  .component('addSongToPlaylistForm', {
    templateUrl: 'js/components/addSongToPlaylistForm/addSongToPlaylistForm.html',
    controller: addSongToPlaylistForm,
    require: 'ngModel',
    bindings: {
      playlist: '='
    }
  });

addSongToPlaylistForm.$inject = ['PlaylistsRepo', 'SongsRepo', '$element']

function addSongToPlaylistForm(PlaylistsRepo, SongsRepo, $element){
  var ctrl = this;


  ctrl.addSongToPlaylist = function(song){
    PlaylistsRepo.addSong(ctrl.playlist._id, song._id).then(function(res){
      console.log(res.data)
      ctrl.playlist.songs.push(song)
    })
  }

  SongsRepo.get().then(function(res){
    console.log(res.data);
    ctrl.songs = res.data;
  });

}
