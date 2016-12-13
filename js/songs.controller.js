angular.module('mp3playground')
  .controller('SongsController', SongsController);

SongsController.$inject = ['$http']

function SongsController($http){
  var self = this;
  self.all = [];
  self.addSong = addSong;
  self.newSong = {};
  self.getAllSongs = getAllSongs;
  self.getMySongs = getMySongs;
  self.deleteSong = deleteSong;
  self.addSongToPlaylist = addSongToPlaylist;
  self.removeSongFromPlaylist = removeSongFromPlaylist;


  function getAllSongs(){
    $http
      .get('http://localhost:3000/api/songs')
      .then(function(response){
        self.all = response.data.songs;
      });
  }

  function addPlaylist(){
    $http
      .post('http://localhost:3000/playlists', self.newPlaylist)
      .then(function(response){
        getAllPlaylists();
      });
      self.newPlaylist = {};
  }

  function deletePlaylist(playlist){
    $http
      .delete("http://localhost:3000/playlists" + playlist._id)
      .then(function(response){
        var index = self.all.indexOf(playlist);
        self.all.splice(index, 1);
      });


}
