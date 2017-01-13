angular.module('Mp3Playground')
  .component('playlistForm', {
    templateUrl: 'js/components/playlistForm/playlistForm.html',
    controller: playlistForm,
    require: 'ngModel',
    bindings: {existingPlaylists: "="}
  });

playlistForm.$inject = ['$http', 'PlaylistsRepo', '$element', '$mdDialog']

function playlistForm($http, PlaylistsRepo, $element, $mdDialog){

  var ctrl = this;
  var alert;


  ctrl.createPlaylist = function(){
    PlaylistsRepo.create(ctrl.playlist).then(function(res){
      console.log(res.data)
    })
  }

  ctrl.showAddPlaylistDialog = function($event){
    var parentEl = angular.element(document.body);
       $mdDialog.show({
         parent: parentEl,
         targetEvent: $event,
         templateUrl: 'js/templates/addPlaylistDialog.html',
         locals: {},
         controller: DialogController
      });
      function DialogController($scope, $mdDialog) {
        $scope.createPlaylist = function() {
          PlaylistsRepo.create($scope.playlist).then(function(res){
            ctrl.existingPlaylists.push(res.data)
            console.log(res.data)
          })
          $mdDialog.hide();
        }
        $scope.playlist = {};
      }
  }

}
