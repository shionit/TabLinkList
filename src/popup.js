
function previewTabText(previewText) {
  var previewArea = document.getElementById("preview")
  previewArea.appendChild(document.createTextNode(previewText));
  previewArea.select();
}

function readTabs() {
  chrome.windows.getCurrent({"populate":true},
    function(currentWindow) {
      var output = "";
      for (var i = 0; i < currentWindow.tabs.length; i++) {
        var title = currentWindow.tabs[i].title;
        var url = currentWindow.tabs[i].url;
        
        var item = title + "\n" + url;
        output += item + "\n\n"
      }
      previewTabText(output);
    });
}

document.addEventListener('DOMContentLoaded', function() {
  readTabs();
});

