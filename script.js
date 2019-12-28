$(".div6").hide();
if(inYoutube) {
  if(inVideo) {
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
      if(timeParameter1.length == 5 && bodyTimeFin1.indexOf(":") != -1) {
        timeParameter = timeParameter1;
      }
      else if(timeParameter2.length == 5 && bodyTimeFin2.indexOf(":") != -1) {
        timeParameter = timeParameter2;
      }
      else {
        alert("error! code: 01 \n(Please send an email to yhcho0405@kakao.com)");
      }
      chrome.tabs.executeScript({
        code: 'document.querySelector("head").querySelector("title").innerText;'
      }, function(videoTitle) {
        chrome.tabs.executeScript({
          code: 'document.querySelector("#notification-count").innerText;'
        }, function(notiCount) {
          strTitle = videoTitle.toString();
          if(notiCount == 0) {
            titleFin = strTitle.substring(0, strTitle.length - 10);//알림이 없을 때
          }
          else {
            titleFin = strTitle.substring(strTitle.indexOf(")") + 2, strTitle.length - 10); //알림이 있을 때
          }
          //else
          //{
          //  titleFin = strTitle.substring(5, strTitle.length - 10); //알림이 두자리 수
          //}
          document.querySelector('#title').innerText = titleFin;
        });
      });

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
  } else {
    $("#btn1").hide();
    $(".div6").show();
  }
}
