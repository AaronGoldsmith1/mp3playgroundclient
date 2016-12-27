angular.module('Mp3Playground')
  .component('playlistForm', {
    templateUrl: 'js/components/playlistForm/playlistForm.html',
    controller: playlistForm,
    require: 'ngModel',
    bindings: {}
  });

playlistForm.$inject = ['$http', 'PlaylistsRepo', '$element']

function playlistForm($http, PlaylistsRepo, $element){
  var ctrl = this;


  ctrl.createPlaylist = function(){
    PlaylistsRepo.create(ctrl.playlist).then(function(res){
      console.log(res.data)
    })
  }

}
