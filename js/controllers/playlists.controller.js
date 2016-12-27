angular.module('Mp3Playground')
  .controller('playlistsController', playlistsController);

playlistsController.$inject = ['PlaylistsRepo']

function playlistsController(PlaylistsRepo){
  var self = this;
  self.deletePlaylist = function(playlist){
    PlaylistsRepo.destroy(playlist._id).then(function(res){
      var playlistToDelete = _.indexOf(self.playlists, playlist)
      self.playlists.splice(playlistToDelete, 1)
    })
    console.log(playlist)
  }

  PlaylistsRepo.get().then(function(res){
    self.playlists = res.data;
  });


}
