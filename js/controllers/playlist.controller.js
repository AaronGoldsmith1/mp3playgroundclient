angular.module('Mp3Playground')
  .controller('PlaylistController', playlistController);

playlistController.$inject = ['PlaylistsRepo', '$stateParams']

function playlistController(PlaylistsRepo, $stateParams){
  var self = this;

  self.removeSongFromPlaylist = function(song){
    PlaylistsRepo.removeSong(self.playlist._id, song._id).then(function(res){
      var songToRemove = _.indexOf(self.playlist.songs, song)
      self.playlist.songs.splice(songToRemove, 1)
    })
  }
  
  PlaylistsRepo.get($stateParams.id).then(function(res){
    self.playlist = res.data;
  });

}
