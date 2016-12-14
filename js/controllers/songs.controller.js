angular.module('Mp3Playground')
  .controller('songsController', songsController);

songsController.$inject = ['$http', 'SongsRepo', 'tokenService']

function songsController($http, SongsRepo, tokenService){
  var self = this;
/*  self.all = [];
  self.addSong = addSong;
  self.newSong = {};
  self.getAllSongs = getAllSongs;
  self.getMySongs = getMySongs;
  self.deleteSong = deleteSong;
  self.addSongToPlaylist = addSongToPlaylist;
  self.removeSongFromPlaylist = removeSongFromPlaylist;
*/
  tokenService.store('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ODRmNzMzYWM2YzBiZTQxNzk4YzMyZTgiLCJlbWFpbCI6ImJiYkBiYmIuY29tIiwibmFtZSI6ImJiYiIsImlhdCI6MTQ4MTY5MjExNSwiZXhwIjoxNDgxNjkyNDE1fQ.hESFZTNMWruvMwrT65HuY7439s6_5eb5Kvym4WehB2A'); //Dont' do this
  function getAllSongs(){
    console.log('SongsController::getAllSongs')
    SongsRepo.get().then(function(res){
      console.log(res.data);
      self.songList = res.data;
    }, function(res){ debugger;/*TODO */ })
  }

  getAllSongs();
}
