angular.module('Mp3Playground')
  .controller('PlaylistController', playlistController);

playlistController.$inject = ['PlaylistsRepo', '$stateParams']

function playlistController(PlaylistsRepo, $stateParams){
  var self = this;

  PlaylistsRepo.get($stateParams.id).then(function(res){
    self.playlist = res.data;
  });
}
