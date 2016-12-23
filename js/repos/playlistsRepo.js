angular.module('Mp3Playground')
  .factory('PlaylistsRepo', playlistsRepo);

  playlistsRepo.inject = ['$http']

  function playlistsRepo($http){
    // var baseUrl = 'https://mp3playground-api.herokuapp.com/api/playlists/';
    var baseUrl = 'http://localhost:3000/api/playlists/';
    return {
        'get': function(playlistId){
          playlistId = playlistId ? playlistId : '';
          return $http.get(baseUrl + playlistId);
        },
        'create': function(data){
          return $http.post(baseUrl, data);
        },
        'addSong': function(playlistId, songId){
          return $http.post(baseUrl + playlistId + '/songs', {songId: songId})
        },
        'update': function(playlistId, data){
          return $http.put(baseUrl + playlistId, data)
        },
        'destroy': function(playlistId){
          return $http.delete(baseUrl + playlistId)
        }
     }
  }
