angular.module('Mp3Playground')
  .component('playlistForm', {
    templateUrl: 'js/components/playlistForm/playlistForm.html',
    controller: playlistForm,
    require: 'ngModel',
    bindings: {}
  });

playlistForm.$inject = ['$http', 'PlaylistsRepo', '$element', 'playlistsCollection']

function playlistForm($http, PlaylistsRepo, $element, playlistsCollection){
  var ctrl = this;


  ctrl.createPlaylist = function(){
    PlaylistsRepo.create(ctrl.playlist).then(function(res){
      playlistsCollection.addPlaylist(res.data);
      console.log(res.data)
    })
  }

}
