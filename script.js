chrome.storage.local.get(function(data) {
  document.getElementById('bmkHistory').innerHTML = data.bmkHis;
});


var totalText;
var count;
var ttarr;
var delBtn = document.getElementById('btn2');
delBtn.addEventListener('click', function(event) {
  var clear = "";
  chrome.storage.local.set({
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
      if (timeParameter.indexOf(":") != -1) {
        timeParameter = timeParameter.replace('m', 'h');
        timeParameter = timeParameter.replace(':', 'm');
      }
      if (timeParameter.indexOf(":") != -1) {
        timeParameter = timeParameter.replace('h', 'd');
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
            titleFin = strTitle.substring(0, strTitle.length - 10);
          } else {
            titleFin = strTitle.substring(strTitle.indexOf(")") + 2, strTitle.length - 10);
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
              chrome.storage.local.get(function(data) {
                totalText = data.bmkHis;
              });
              bmkBtn.addEventListener('click', function(event) {

                var resultDiv = document.createElement("div");

                ttarr = totalText.split('\n');
                count = ttarr.length;

                var final = '\n<div id="ddivv' + count + '">   <div class="divv"><div id="title"><a href="' + linkFin + '"target="_blank">' + titleFin + '</a></div><div id="wrapper"><a href="' + linkFin + '" " target="_blank"><img id="thumb1" src="' + thumbFin + '"></div></a><input type="button" id="' + count + '" class="button2" value="DELETE"></div>   </div id="ddivv' + count + '">';

                totalText = totalText + final;
                ttarr = totalText.split('\n');

                resultDiv.innerHTML = final;
                document.getElementById('bmkHistory').append(resultDiv);

                chrome.storage.local.set({
                  bmkHis: totalText
                });
                $(function() {
                  $(".button2").click(function() {
                    chrome.storage.local.get(function(data) {
                      totalText = data.bmkHis;
                    });
                    var delId = "ddivv" + $(this).attr('id');
                    var delPara = document.getElementById(delId);
                    delPara.innerHTML = "";
                    var coo = delId.length + 2;
                    var startIn = totalText.indexOf(delId);
                    var finishIn = totalText.indexOf(delId, startIn + 1);
                    var deleteArr = totalText.substring(startIn + coo, finishIn - 11);
                    totalText = totalText.replace(deleteArr, "");
                    chrome.storage.local.set({
                      bmkHis: totalText
                    });
                  });
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

$(function() {
  $(".button2").click(function() {
    var delId = "ddivv" + $(this).attr('id');
    var delPara = document.getElementById(delId);
    delPara.innerHTML = "";
    chrome.storage.local.get(function(data) {
      totalText = data.bmkHis;
    });
    var coo = delId.length + 2;
    var startIn = totalText.indexOf(delId);
    var finishIn = totalText.indexOf(delId, startIn + 1);
    var deleteArr = totalText.substring(startIn + coo, finishIn - 11);
    totalText = totalText.replace(deleteArr, "");
    chrome.storage.local.set({
      bmkHis: totalText
    });
  });
});

$(".div5").hide();

if (!inYoutube) {
  $("#btn1").hide();
  $(".div5").show();
}
