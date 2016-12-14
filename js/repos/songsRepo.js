angular.module('Mp3Playground')
  .factory('SongsRepo', SongsRepo);

  SongsRepo.$inject = ['$http'];

  function SongsRepo($http){
    var baseUrl = 'http://localhost:3000/api/songs/';
    return {
        'get': function(songId){
          songId = songId ? songId : '';
          return $http.get(baseUrl + songId);
          // wavesurfer.load(baseUrl + songId);
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
