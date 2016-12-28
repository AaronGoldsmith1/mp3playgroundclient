angular.module('Mp3Playground')
  .factory('LastfmRepo', LastfmRepo);


LastfmRepo.inject = ['$http', 'LASTFM_API_KEY']

function LastfmRepo($http, LASTFM_API_KEY){
  var baseUrl = 'http://ws.audioscrobbler.com/2.0/'

  return {
    'getSimilar': function(artist, track){

      return $http.get(baseUrl, {params: {
        method: 'track.getsimilar',
        format: 'json',
        api_key: LASTFM_API_KEY,
        artist: artist,
        track: track,
        limit: 4
      }})

    }
  }

}
