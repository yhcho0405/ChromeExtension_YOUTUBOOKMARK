var totalText;
var delBtn = document.getElementById('btn2');
delBtn.addEventListener('click', function(event) {
  var clear = "";
  chrome.storage.sync.set({
    bmkHis: clear
  });
  totalText = "";
  document.getElementById('bmkHistory').innerHTML = clear;
});

$(".div6").hide();
if (inYoutube) {
  if (inVideo) {
    var titleFin;
    var linkFin;
    var thumbFin;
    //time
    chrome.tabs.executeScript({
      code: 'document.querySelector("body").querySelector(".ytp-time-current").innerText;'
    }, function(result) {
      var bodyTimeFin = result + "s";
      var timeParameter = bodyTimeFin.replace(':', 'm');
      if(timeParameter.indexOf(":") != -1) {
        timeParameter = timeParameter.replace('m', 'h');
        timeParameter = timeParameter.replace(':', 'm');
      }

      chrome.tabs.executeScript({
        code: 'document.querySelector("head").querySelector("title").innerText;'
      }, function(videoTitle) {
        chrome.tabs.executeScript({
          code: 'document.querySelector("#notification-count").innerText;'
        }, function(notiCount) {
          strTitle = videoTitle.toString();
          if (notiCount == 0) {
            titleFin = strTitle.substring(0, strTitle.length - 10); //알림이 없을 때
          } else {
            titleFin = strTitle.substring(strTitle.indexOf(")") + 2, strTitle.length - 10); //알림이 있을 때
          }

          chrome.tabs.query({
            'active': true,
            'lastFocusedWindow': true,
            'currentWindow': true
          }, function(tabs) {
            var url = tabs[0].url.substring(32, 43);
            linkFin = "https://youtu.be/" + url + "?t=" + timeParameter;

            chrome.tabs.query({
              'active': true,
              'lastFocusedWindow': true,
              'currentWindow': true
            }, function(tab) {
              var url1 = tab[0].url.substring(32, 43);
              thumbFin = "https://img.youtube.com/vi/" + url1 + "/default.jpg";

              var bmkBtn = document.getElementById('btn1');
              chrome.storage.sync.get(function(data) {
                totalText = data.bmkHis;
              });
              bmkBtn.addEventListener('click', function(event) {

                var resultDiv = document.createElement("div");

                var final = '<div id="divv"><div id="title"><a href="' + linkFin + '"target="_blank">' + titleFin + '</a></div><div id="wrapper"><a href="' + linkFin + '" " target="_blank"><img id="thumb1" src="' + thumbFin + '"></div></a></div>';

                totalText = totalText + final;

                resultDiv.innerHTML = final;
                document.getElementById('bmkHistory').append(resultDiv);

                chrome.storage.sync.set({
                  bmkHis: totalText
                });
              });
            });
          });
        });
      });
    });
  } else {
    $("#btn1").hide();
    $(".div6").show();
  }
}

//'<a href="' + linkFin + '"><div id="title">' + titleFin + '</div></a>' '<a href="' + linkFin + '"><iframe scrolling="no" id="thumb1" width="120" height="90" src="' + thumbFin + '" frameborder="0" allowfullscreen></iframe></a>';
