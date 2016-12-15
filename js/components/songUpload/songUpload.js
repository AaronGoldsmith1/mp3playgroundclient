angular.module('Mp3Playground')
  .component('songUpload', {
    templateUrl: '/js/components/songUpload/songUpload.html',
    controller: songUpload,
    require: 'ngModel',
    bindings: {}
  });

songUpload.$inject = ['$http', '$element', 'SongsRepo']

function songUpload($http, $element, SongsRepo){
  var ctrl = this;
  ctrl.onFileInputChanged = function(){
    console.log("onFileInputChanged", arguments);
    var $input = $element.find('input')[2];
    var file = $input.files[0];
    if(file == null){
      return alert('No file selected.');
    }

    //console.log(ctrl.song);
    getSignedRequest(file);
  }

  function getSignedRequest(file){
    $http.get('http://localhost:3000/sign-s3?file-name=' + file.name + '&file-type=' + file.type)
      .then(function(res){
        ctrl.data = res.data;
        console.log(res);
        ctrl.song.url = res.data.url;
        uploadFile(file, res.data.signedRequest, res.data.url);
      })
  } 

  function uploadFile(file, signedRequest, url){
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', signedRequest);
    xhr.onreadystatechange = () => {
      if(xhr.readyState === 4){
        if(xhr.status === 200){
          SongsRepo.create(ctrl.song).then(function(res){
            console.log(res.data);
          });
          //document.getElementById('preview').src = url;
          //document.getElementById('avatar-url').value = url;
        }
        else{
          alert('Could not upload file.');
        }
      }
    };
    xhr.send(file);
  }
}
