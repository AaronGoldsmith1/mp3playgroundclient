angular.module('Mp3Playground')
  .component('songUpload', {
    templateUrl: 'js/components/songUpload/songUpload.html',
    controller: songUpload,
    require: 'ngModel',
    bindings: {
      existingSongs: '='
    }
  });

songUpload.$inject = ['$http', 'SongsRepo', '$element', 'AudioParser']

function songUpload($http, SongsRepo, $element, AudioParser){
  var ctrl = this;
  ctrl.songsRepo = SongsRepo;
  ctrl.fileName = '';

  var input = document.getElementById('song-file-picker')
  var fileNameSpan = document.getElementById('status')

  input.addEventListener('change', function(){
    var str = input.value;
    var i;
    if (str.lastIndexOf('\\')) {
      i = str.lastIndexOf('\\') + 1;
    } else if (str.lastIndexOf('/')) {
      i = str.lastIndexOf('/') + 1;
    }

    ctrl.fileName = str.slice(i, str.length);
    console.log(ctrl.fileName);
    fileNameSpan.innerText = ctrl.fileName;
  })

  ctrl.uploadSongButtonClicked = function(){
    console.log("uploadSongButtonClicked", arguments);
    var $input = $element.find('input')[0];
    var file = $input.files[0];
    if(file == null){
      return alert('No file selected.');
    }
    AudioParser.getInfo(file).then(function(fileInfo){
       getSignedRequest(file);
    });


    //console.log(ctrl.song);

  }

  function getSignedRequest(file){
    $http.get('https://mp3playground-api.herokuapp.com/sign-s3?file-name=' + file.name + '&file-type=' + file.type)
      .then(function(res){
        ctrl.data = res.data;
        console.log(res);

        ctrl.song = ctrl.song || {};
        ctrl.song.url = res.data.url;
        ctrl.song.s3_key = file.name;
        uploadFile(file, res.data.signedRequest, res.data.url);
      })
  } 

//low-level javascript request from https://devcenter.heroku.com/articles/s3-upload-node
  function uploadFile(file, signedRequest, url){
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', signedRequest); //could have used $http.put
    xhr.onreadystatechange = () => {
      if(xhr.readyState === 4){
        if(xhr.status === 200){
          ctrl.songsRepo.create(ctrl.song).then(function(res){
            ctrl.existingSongs.push(res.data)
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
