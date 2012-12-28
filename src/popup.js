
function previewTabText(previewText) {
  var previewArea = document.getElementById("preview");
  
  // clear current Text, if exist
  if (previewArea.firstChild) {
    previewArea.removeChild(previewArea.firstChild);
  }
  
  previewArea.appendChild(document.createTextNode(previewText));
  previewArea.select();
}

var refreshPreviewText = function() {
  chrome.windows.getCurrent({"populate":true},
    function(currentWindow) {
      var output = "";

      for (var i = 0; i < currentWindow.tabs.length; i++) {
        var tab = currentWindow.tabs[i];
        var tabSelect = document.getElementById("tab_" + tab.id);

        // if the tab is selected, add output.
        if (tabSelect && tabSelect.checked) {
          var title = tab.title;
          var url = tab.url;
          var item = title + "\n" + url;
          
          if (0 < output.length) {
            output += "\n\n";
          }
          output += item;
        }
      }
      previewTabText(output);
    });
}

function appendTabItem(tab) {
  // clone template node
  var template = document.getElementById("tab_template");
  var newItem = template.cloneNode(true); // clone with child node.
  newItem.removeAttribute("id");
  
  // set checkbox attribute
  var checkbox = newItem.firstChild;
  checkbox.setAttribute("id", "tab_" + tab.id);
  checkbox.setAttribute("value", tab.id);
  
  // append checkbox label
  var label = document.createElement("label");
  label.appendChild(document.createTextNode(tab.title));
  label.setAttribute("for", "tab_" + tab.id);
  newItem.appendChild(label);

  // add onClick Event
  newItem.addEventListener('click', refreshPreviewText);

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

      refreshPreviewText();
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
  refreshPreviewText();
}

function initializeAllCheck() {
  // add event listener
  var allCheck = document.getElementById("all_check");
  allCheck.addEventListener('click', function() {
    toggleSelectAll(this.checked);
  });
}

document.addEventListener('DOMContentLoaded', function() {
  initializeTabList();
  initializeAllCheck();
});

