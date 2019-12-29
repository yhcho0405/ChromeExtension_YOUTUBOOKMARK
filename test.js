chrome.storage.sync.get(function(data) {
  document.getElementById('bmkHistory').innerHTML = data.bmkHis;
});
