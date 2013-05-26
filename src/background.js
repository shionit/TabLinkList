
function copyTextToClipboard(text) {
  // Copy provided text to the clipboard.
  var copyFrom = document.createElement("textarea");
  copyFrom.value = text;
  document.body.appendChild(copyFrom);
  copyFrom.select();
  document.execCommand("Copy");
  document.body.removeChild(copyFrom);
}

var copySimpleTextToClipboard = function(selectedTabs, formatFunc) {
  var output = "";

  // format output
  for (var i = 0; i < selectedTabs.length; i++) {
    var tab = selectedTabs[i];

    var item = "";
    if (formatFunc == null) {
      item = FormatTitleAndURL(tab);
    } else {
      item = formatFunc(tab);
    }

    if (0 < output.length) {
      output += "\n\n";
    }
    output += item;
  }

  // do action
  copyTextToClipboard(output);
}

// formatFunctions
function FormatTitleAndURL(tab) {
  return tab.title + "\n" + tab.url;
}

function FormatTitleOnly(tab) {
  return tab.title;
}

// Context Menu
chrome.contextMenus.create({
  "title": "Copy this page's Title and URL",
  "type": "normal",
  "id": "copyThisPage",
  "contexts": ["all"],
  "onclick": function(info, tab) {
    copySimpleTextToClipboard([tab]);
  }
}, function() { console.log(chrome.extension.lastError);});

chrome.contextMenus.create({
  "title": "Copy this page's Title",
  "type": "normal",
  "id": "copyThisPageTitle",
  "contexts": ["all"],
  "onclick": function(info, tab) {
    copySimpleTextToClipboard([tab], FormatTitleOnly);
  }
}, function() { console.log(chrome.extension.lastError);});

