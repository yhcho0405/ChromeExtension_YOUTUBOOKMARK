function togglePlay() {
  var v = document.querySelector('video');

  if (v == null) return;

  (v.paused) ? v.play() : v.pause();
}
chrome.tabs.executeScript({
  code:'document.querySelector("body").innerText;'
}, function(result){

  var bodyText = result[0];

  var bodySep = bodyText.split(' ');

  var bodyTime = bodySep[1];

  var textFin = bodyTime.split('\n');

  var bodyTimeFin = textFin[2] + "s";

  var timeParameter = bodyTimeFin.replace(':', 'm');

  var cart_wrapper = document.getElementsByClassName("style-scope yt-img-shadow");


  togglePlay();
  document.querySelector('#user').innerText = result[0];
});
