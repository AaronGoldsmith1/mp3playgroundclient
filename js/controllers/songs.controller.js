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

  function getAllSongs(){
    SongsRepo.get().then(function(res){
      console.log(res.data);
      self.songList = res.data;
    });
  };
    //referencing self instead of ctrl
  self.deleteSong = function(song){
    SongsRepo.destroy(song._id).then(function(res){
      var songToDelete = _.indexOf(self.songList, song)
      if (songToDelete > -1) {
        self.songList.splice(songToDelete, 1)
      }
    })
  }


  getAllSongs();


};
