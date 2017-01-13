angular.module('Mp3Playground')
  .controller('PlaylistsController', PlaylistsController);

PlaylistsController.$inject = ['$http']

function PlaylistsController($http){
  var self = this

  self.all = [];
  self.addPlaylist = addPlaylist;
  self.newPlaylist = {};
  self.getAllPlaylists = getAllPlaylists;
  self.getMyPlaylists = getMyPlaylists;
  self.deletePlaylist = deletePlaylist;

  function getAllPlaylists(){
    $http
      .get('https://mp3playground-api.herokuapp.com/api/playlists')
      .then(function(response){
        self.all = response.data.playlists;
      });
  }

  function addPlaylist(){
    $http
      .post('https://mp3playground-api.herokuapp.com/api/playlists', self.newPlaylist)
      .then(function(response){
        getAllPlaylists();
      });
      self.newPlaylist = {};
  }

  function deletePlaylist(playlist){
    $http
      .delete("https://mp3playground-api.herokuapp.com/api/playlists" + playlist._id)
      .then(function(response){
        var index = self.all.indexOf(playlist);
        self.all.splice(index, 1);
      });


}
