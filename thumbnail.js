chrome.tabs.query({
  'active': true,
  'lastFocusedWindow': true,
  'currentWindow': true
}, function(tab) {
  var url1 = tab[0].url.substring(32, 43);
  var linkFin1 = "https://img.youtube.com/vi/" + url1 + "/default.jpg";
  document.getElementById('thumb1').src = linkFin1;
});
