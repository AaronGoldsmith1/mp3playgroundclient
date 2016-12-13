angular.module('mp3playground')
  .controller('PlaylistsController', PlaylistsController);

PlaylistsController.$inject = ['$http']

function PlaylistsController($http){
  var self = this;
  self.all = [];
  self.addPlaylist = addPlaylist;
  self.newPlaylist = {};
  self.getAllPlaylists = getAllPlaylists;
  self.getMyPlaylists = getMyPlaylists;
  self.deletePlaylist = deletePlaylist;
  // self.addSongToPlaylist = addSongToPlaylist;
  // self.removeSongFromPlaylist = removeSongFromPlaylist;
  // self.deleteSong = deleteSong;

  // getMyPlaylists();
  // updatePlaylists();

  function getAllPlaylists(){
    $http
      .get('http://localhost:3000/api/playlists')
      .then(function(response){
        self.all = response.data.playlists;
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
