
function previewTabText(previewText) {
  var previewArea = document.getElementById("preview");
  previewArea.appendChild(document.createTextNode(previewText));
  previewArea.select();
}

function appendTabItem(tab) {
  try {
  var template = document.getElementById("tab_template");
  var newItem = template.cloneNode(true); // clone with child node.
  newItem.removeAttribute("id");
  newItem.appendChild(document.createTextNode(tab.title));
  
  // add list
  var tabs = document.getElementById("tabs");
  tabs.appendChild(newItem);
  } catch(e) {
    alert(e);
  }
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
        
        appendTabItem(currentWindow.tabs[i]);
      }

      previewTabText(output);
    });
}

document.addEventListener('DOMContentLoaded', function() {
  readTabs();
});

