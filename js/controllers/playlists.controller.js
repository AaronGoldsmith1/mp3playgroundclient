angular.module('Mp3Playground')
  .controller('playlistsController', playlistsController);

playlistsController.$inject = ['PlaylistsRepo']

function playlistsController(PlaylistsRepo){
  var self = this;

  PlaylistsRepo.get().then(function(res){
    self.playlists = res.data;
  });
}
