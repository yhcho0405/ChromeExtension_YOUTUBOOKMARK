var inYoutube = true;
var inVideo = true;

chrome.tabs.query({
  'active': true,
  'lastFocusedWindow': true,
  'currentWindow': true
}, function(tabs) {

  var url = tabs[0].url;
  if(url.indexOf("youtube.com") == -1) {
    inYoutube = false;
  }
  if(url.indexOf("watch") == -1) {
    inVideo = false;
  }
});
