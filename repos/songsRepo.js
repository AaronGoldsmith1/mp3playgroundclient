angular.module('Mp3Playground')
  .factory('SongsRepo', songsRepo);

  $songsRepo.inject(['$http'])

  function songsRepo($http){
    var baseUrl = 'http://localhost:3000/api/songs/';
    return {
        'get': function(songId){
          songId = songId ? songId : '';
          return $http.get(baseUrl + songId);
        },
        'create': function(data){
          //todo: validate data is accurate
          return $http.post(baseUrl, data);
        },
        'update': function(songId, data){
          return $http.put(baseUrl + songId, data)
        },
        'destroy': function(songId){
          return $http.delete(baseUrl + songId)

        }
     }
  }
