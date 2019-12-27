var inYoutube = true;
chrome.tabs.query({
  'active': true,
  'lastFocusedWindow': true,
  'currentWindow': true
}, function(tabs) {
  var url = tabs[0].url;
  if(url.indexOf("youtube") == -1) {
    inYoutube = false;
  }
});
