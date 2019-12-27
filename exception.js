chrome.tabs.query({
  'active': true,
  'lastFocusedWindow': true,
  'currentWindow': true
}, function(tabs) {
  var url = tabs[0].url;
  if(url.indexOf("youtube") == -1) {
    //alert("error");
    //document.getElementById("bin1").style.display = "none";
  }
});
