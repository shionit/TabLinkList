
function copyTextToClipboard(text) {
  // Copy provided text to the clipboard.
  var copyFrom = document.createElement("textarea");
  copyFrom.value = text;
  document.body.appendChild(copyFrom);
  copyFrom.select();
  document.execCommand("Copy");
  document.body.removeChild(copyFrom);
}

var copySimpleTextToClipboard = function(selectedTabs) {
  var output = "";

  // format output
  for (var i = 0; i < selectedTabs.length; i++) {
    var tab = selectedTabs[i];
    
    var title = tab.title;
    var url = tab.url;
    var item = title + "\n" + url;

    if (0 < output.length) {
      output += "\n\n";
    }
    output += item;
  }
  
  // do action
  copyTextToClipboard(output);
}

// Context Menu
chrome.contextMenus.create({
  "title": "Copy this page's Title and URL",
  "type": "normal",
  "contexts": ["all"],
  "onclick": function(info, tab) {
    copySimpleTextToClipboard([tab]);
  }
});