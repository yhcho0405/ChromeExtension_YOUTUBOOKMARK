//profile
chrome.tabs.executeScript({
  code: 'jQuery("#img").attr("src");'
}, function(sourceProfile) {
  //alert(sourceProfile);
});

//time
chrome.tabs.executeScript({
  code: 'document.querySelector("body").innerText;'
}, function(result) {
  var bodyText = result[0];
  var bodySep = bodyText.split(' ');
  var bodyTime = bodySep[1];
  var textFin = bodyTime.split('\n');
  var bodyTimeFin = textFin[2] + "s";
  var timeParameter = bodyTimeFin.replace(':', 'm');

  chrome.tabs.query({
    'active': true,
    'lastFocusedWindow': true,
    'currentWindow': true
  }, function(tabs) {
    var url = tabs[0].url.substring(32, 43);
    var linkFin = "https://youtu.be/" + url + "?t=" + timeParameter;
    document.querySelector('#user').innerText = linkFin;
  });
});



//url

//document.querySelector('#user').innerText = ;


//var linkFin ="https://youtu.be/"+ +"?t="+timeParameter;
//alert(linkFin);
