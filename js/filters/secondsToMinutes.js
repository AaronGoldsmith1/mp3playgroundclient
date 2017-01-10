angular.module('Mp3Playground')
  .filter('secondsToMinutes', secondsToMinutes)

function secondsToMinutes(){
  function pad(num) {
    return ("0"+num).slice(-2);
  }

  return function(seconds){
      if (isNaN(seconds)){
        return seconds
      }
      var secs = Math.floor(seconds)
      var minutes = Math.floor(secs / 60);
      secs = secs%60;
      minutes = minutes%60;
      return pad(minutes)+":"+pad(secs);
    }
}
