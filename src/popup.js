// @require background.js

function appendTabItem(tab) {
  // clone template node
  var template = document.getElementById("tab_template");
  var newItem = template.cloneNode(true); // clone with child node.
  newItem.removeAttribute("id");

  // set checkbox attribute
  var checkbox = newItem.firstChild;
  checkbox.setAttribute("id", "tab_" + tab.id);
  checkbox.setAttribute("value", tab.id);
  
  if (tab.selected) {
  	checkbox.setAttribute("checked", "checked");
  }

  if (tab.favIconUrl) {
    // append favicon image
    var image = document.createElement("img");
    image.setAttribute("src", tab.favIconUrl);
    image.setAttribute("width", 16);
    image.setAttribute("height", 16);
    newItem.appendChild(image);
  }

  // append checkbox label
  var label = document.createElement("label");
  label.appendChild(document.createTextNode(tab.title));
  label.setAttribute("for", "tab_" + tab.id);
  newItem.appendChild(label);

  // add list
  var tabs = document.getElementById("tabs");
  tabs.appendChild(newItem);
}

// this method must be called only starup.
function removeTemplate() {
  var template = document.getElementById("tab_template");
  template.parentNode.removeChild(template);
}

function initializeTabList() {
  chrome.windows.getCurrent({"populate":true},
    function(currentWindow) {
      // append tab items
      for (var i = 0; i < currentWindow.tabs.length; i++) {
        appendTabItem(currentWindow.tabs[i]);
      }

      removeTemplate();
    });
}

function toggleSelectAll(checked) {
  var checkboxes = document.getElementsByTagName("input");

  for (var i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].id.substring(0, 4) == "tab_") {
      checkboxes[i].checked = checked;
    }
  }
}

function initializeAllCheck() {
  // add event listener
  var allCheck = document.getElementById("all_check");
  allCheck.addEventListener('click', function() {
    toggleSelectAll(this.checked);
  });
}

function processSelectedTabs(delegate) {
  // aggregate selected tabs and delegate it to the parameter function.
  chrome.windows.getCurrent({"populate":true},
    function(currentWindow) {
      var tabs = [];

      for (var i = 0; i < currentWindow.tabs.length; i++) {
        var tab = currentWindow.tabs[i];
        var tabSelect = document.getElementById("tab_" + tab.id);

        // if the tab is selected, add it.
        if (tabSelect && tabSelect.checked) {
          tabs.push(tab);
        }
      }
      delegate(tabs);
    });
}

function copyToClipboard(){
  // Copy text from selected tabs
  processSelectedTabs(copySimpleTextToClipboard);
}

function initializeActions() {
  var copyButton = document.getElementById("copy_button");
  copyButton.addEventListener('click', function() {
    copyToClipboard();
  });
}

document.addEventListener('DOMContentLoaded', function() {
  // startup
  initializeTabList();
  initializeAllCheck();
  initializeActions();
});

