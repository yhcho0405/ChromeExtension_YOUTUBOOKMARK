$(".div6").hide();
if (inYoutube) {
  if (inVideo) {
    var titleFin;
    var linkFin;
    var thumbFin;
    var totalText;
    chrome.storage.sync.get(function(data) {
      totalText = data.bmkHis;
    });
    //time
    chrome.tabs.executeScript({
      code: 'document.querySelector("body").innerText;'
    }, function(result) {
      var bodyText = result[0];
      var bodySep = bodyText.split(' ');
      var bodyTime = bodySep[1];
      var textFin = bodyTime.split('\n');
      var bodyTimeFin1 = textFin[1] + "s";
      var bodyTimeFin2 = textFin[2] + "s";
      var timeParameter1 = bodyTimeFin1.replace(':', 'm');
      var timeParameter2 = bodyTimeFin2.replace(':', 'm');
      if (bodyTimeFin1.indexOf(":") != -1) {
        timeParameter = timeParameter1;
      } else if (bodyTimeFin2.indexOf(":") != -1) {
        timeParameter = timeParameter2;
      } else {
        alert("TimeIndex Error! \n(Please send an email to yhcho0405@kakao.com)");
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
              bmkBtn.addEventListener('click', function(event) {

                var resultDiv = document.createElement("div");

                var final = '<div id="title">' + titleFin + '</div><div id="link">' + linkFin + '</div><div id="wrapper"><img id="thumb1" src="' + thumbFin + '"></div>';

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
var delBtn = document.getElementById('btn2');
delBtn.addEventListener('click', function(event) {
  document.getElementById('bmkHistory').innerHTML = "";
  var clear = "";
  chrome.storage.sync.set({
    bmkHis: clear
  });
});

//'<a href="' + linkFin + '"><div id="title">' + titleFin + '</div></a>' '<a href="' + linkFin + '"><iframe scrolling="no" id="thumb1" width="120" height="90" src="' + thumbFin + '" frameborder="0" allowfullscreen></iframe></a>';
