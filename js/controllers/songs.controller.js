angular.module('Mp3Playground')
  .controller('songsController', songsController);

songsController.$inject = ['$http', 'SongsRepo', 'tokenService']

function songsController($http, SongsRepo, tokenService){
  var self = this;
/*  self.all = [];
  self.addSong = addSong;
  self.newSong = {};
  self.getAllSongs = getAllSongs;
  self.getMySongs = getMySongs;
  self.deleteSong = deleteSong;
  self.addSongToPlaylist = addSongToPlaylist;
  self.removeSongFromPlaylist = removeSongFromPlaylist;
*/

  function getAllSongs(){
    console.log('SongsController::getAllSongs')
    SongsRepo.get().then(function(res){
      console.log(res.data);
      self.songList = res.data;
    }, function(res))
  }

  getAllSongs();
}
