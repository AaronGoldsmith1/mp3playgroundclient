angular.module('Mp3Playground')
  .factory('PlaylistsRepo', playlistsRepo);

  playlistsRepo.inject = ['$http']

  function playlistsRepo($http){
    var baseUrl = 'http://localhost:3000/api/playlists/';
    return {
        'get': function(playlistId){
          playlistId = playlistId ? playlistId : '';
          return $http.get(baseUrl + playlistId);
        },
        'create': function(data){
          return $http.post(baseUrl, data);
        },
        'update': function(playlistId, data){
          return $http.put(baseUrl + playlistId, data)
        },
        'destroy': function(playlistId){
          return $http.delete(baseUrl + playlistId)
        }
     }
  }
