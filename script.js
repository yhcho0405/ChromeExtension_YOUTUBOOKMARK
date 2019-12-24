//profile
chrome.tabs.executeScript({
  code:'jQuery("#img").attr("src");'
}, function(sourceProfile){
  alert(sourceProfile);
});
//time
chrome.tabs.executeScript({
  code:'document.querySelector("body").innerText;'
}, function(result){

  var bodyText = result[0];

  var bodySep = bodyText.split(' ');

  var bodyTime = bodySep[1];

  var textFin = bodyTime.split('\n');

  var bodyTimeFin = textFin[2] + "s";

  var timeParameter = bodyTimeFin.replace(':', 'm');

  document.querySelector('#user').innerText = result[0];
});
