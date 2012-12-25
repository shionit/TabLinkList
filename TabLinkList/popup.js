
alert("start!");

output = "";

function readTabs() {
  alert("readTabs!");

  chrome.windows.getCurrent(function(currentWindow) {
    alert(currentWindow.tabs.length);
      for (var i = 0; i < currentWindow.tabs.length; i++) {
        var title = currentWindow.tabs[i].title;
        var url = currentWindow.tabs[i].url;
        
        var item = title + "\n" + url;
        alert(item);
        output += item + "\n\n"
      }
    });
}

// テキストをクリップボードにコピーする関数
var copyTextToClipboard = function(txt){
    var copyArea = document.createElement("<textarea/>");
    copyArea.text(txt);
    document.body.append(copyArea);
    copyArea.select();
    document.execCommand("copy");
    copyArea.remove();
}


readTabs();

alert("readed!" + output);

copyTextToClipboard(output);


